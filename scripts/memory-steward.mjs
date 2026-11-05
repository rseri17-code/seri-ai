#!/usr/bin/env node
// Agent-neutral, deterministic steward report. Does not accept facts or modify memory.
import fs from 'node:fs';
import path from 'node:path';
import {auditDirectory} from './memory-gate.mjs';

const args=process.argv.slice(2);
const dirname=args.includes('--dir')?args[args.indexOf('--dir')+1]:'memory/inbox';
const out=args.includes('--out')?args[args.indexOf('--out')+1]:null;
const audit=auditDirectory(dirname);
const proposals=[];
for(const file of fs.existsSync(dirname)?fs.readdirSync(dirname).filter(x=>x.endsWith('.json')).sort():[]){
 try{
   const x=JSON.parse(fs.readFileSync(path.join(dirname,file),'utf8'));
   proposals.push({id:x.id||file,agent:x.agent||'unknown',domain:x.domain||'unknown',status:x.status||'invalid',entity_id:x.entity_id||'',claim_key:x.claim_key||'',source_ref:x.source_ref||'',recommended_action:!audit.ok?'review conflicts and invalid records':x.status==='approved'?'verify owner consent and eligible promotion':'hold for independent evidence and owner review'});
 }catch{
   proposals.push({id:file,status:'invalid',recommended_action:'fix JSON'});
 }
}
const report={schema_version:1,generated_at:new Date().toISOString(),canonical:'main:SECOND_BRAIN.md',result:audit.ok?'proposal review available':'BLOCKED: invalid or conflicting proposals',auto_promoted:0,validation:audit,proposals,limitations:['No access to private conversations','No semantic truth determination from text','No promotion without explicit review']};
const json=JSON.stringify(report,null,2)+'\n';
if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,json)}
else process.stdout.write(json);
if(!audit.ok)process.exitCode=1;
