import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {auditDirectory,validateEntry} from './memory-gate.mjs';

function entry(id,value='Decision remains under review',extra={}){
  return {id,agent:'Grok',recorded_at:'2026-11-05T12:00:00Z',domain:'career',
    entity_id:'career-role-1',claim_key:'offer-state',value,status:'proposed',
    source_ref:'session:non-sensitive-provenance',invalidation:'When decision changes',...extra};
}
test('valid proposed entry',()=>assert.deepEqual(validateEntry(entry('a1'),'a1.json'),[]));
test('approved needs owner receipt',()=>assert.match(validateEntry(entry('a1','Approved decision',{status:'approved'}),'a1.json').join(','),/approved_by/));
test('rejects contact details',()=>assert.match(validateEntry(entry('a1','Contact at foo@example.com'),'a1.json').join(','),/privacy/));
test('rejects sensitive topic',()=>assert.match(validateEntry(entry('a1','My medical diagnosis'),'a1.json').join(','),/sensitive/));
function withInbox(fn){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'brain-test-'));
 try{fn(dir)}finally{fs.rmSync(dir,{recursive:true,force:true})}
}
test('detects semantic contradiction even when different files can cleanly commit',()=>withInbox(dir=>{
 fs.writeFileSync(path.join(dir,'a1.json'),JSON.stringify(entry('a1','Offer accepted')));
 fs.writeFileSync(path.join(dir,'b1.json'),JSON.stringify(entry('b1','Offer declined',{agent:'ChatGPT'})));
 const r=auditDirectory(dir);
 assert.equal(r.ok,false);assert.match(JSON.stringify(r.violations),/SEMANTIC_CONFLICT/);
}));
test('explicit supersession is traceable and allowed',()=>withInbox(dir=>{
 fs.writeFileSync(path.join(dir,'a1.json'),JSON.stringify(entry('a1','Offer pending')));
 fs.writeFileSync(path.join(dir,'b1.json'),JSON.stringify(entry('b1','Offer accepted',{supersedes:['a1']})));
 const r=auditDirectory(dir);assert.equal(r.ok,true);
}));
test('two compatible updates coexist',()=>withInbox(dir=>{
 fs.writeFileSync(path.join(dir,'a1.json'),JSON.stringify(entry('a1')));
 fs.writeFileSync(path.join(dir,'b1.json'),JSON.stringify(entry('b1')));
 assert.equal(auditDirectory(dir).ok,true);
}));
