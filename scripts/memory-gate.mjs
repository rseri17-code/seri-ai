#!/usr/bin/env node
// Deterministic, offline-safe intake validator. No LLM, network, or auto-promotion.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const DOMAINS = new Set(['career','tiaa','neo','ventures','engineering','investing','retirement','real-estate','financial-planning','goals','cognitive-os']);
export const STATES = new Set(['proposed','approved','rejected']);
export const AGENTS = new Set(['ChatGPT','Grok','Claude','other']);
const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE = /(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/;
const SENSITIVE_KEYS = /\b(password|private.key|api.key|secret|access.token|account.number|ssn|medical|diagnosis|family.member|partner.name|children.name)\b/i;
const ID_PATTERN = /^[a-z0-9][a-z0-9._-]{1,79}$/;
const ISO_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

export function validateEntry(v, filename) {
  const errors=[];
  if (!v || typeof v !== 'object' || Array.isArray(v)) return ['must be an object'];
  const needed=['id','agent','recorded_at','domain','entity_id','claim_key','value','status','source_ref','invalidation'];
  for(const key of needed) if (!(key in v)) errors.push('missing '+key);
  for(const key of ['id','entity_id','claim_key']) if(typeof v[key] !== 'string' || !ID_PATTERN.test(v[key])) errors.push('invalid '+key);
  if(v.id && filename!==v.id+'.json') errors.push('filename must equal id.json');
  if(!AGENTS.has(v.agent))errors.push('invalid agent');
  if(!DOMAINS.has(v.domain))errors.push('invalid domain');
  if(!STATES.has(v.status))errors.push('invalid status');
  if(typeof v.recorded_at!=='string'||!ISO_UTC.test(v.recorded_at)||!Number.isFinite(Date.parse(v.recorded_at)))errors.push('invalid UTC recorded_at');
  if(typeof v.value!=='string'||v.value.trim().length<3||v.value.length>700)errors.push('invalid value: 3-700 characters');
  if(typeof v.source_ref!=='string'||v.source_ref.trim().length<4||v.source_ref.length>300)errors.push('invalid source_ref');
  if(typeof v.invalidation!=='string'||!v.invalidation.trim()||v.invalidation.length>300)errors.push('invalid invalidation');
  if(v.status==='approved' && (v.approved_by!=='Ravi'||!v.approval_ref)) errors.push('approved entries require approved_by Ravi and approval_ref');
  if(v.supersedes!==undefined && (!Array.isArray(v.supersedes)||v.supersedes.some(x=>typeof x!=='string'||!ID_PATTERN.test(x)))) errors.push('invalid supersedes');
  const serialized=JSON.stringify(v);
  if(EMAIL.test(serialized)||PHONE.test(serialized))errors.push('possible email/phone: manual privacy review required');
  if(SENSITIVE_KEYS.test([v.claim_key,v.value,v.source_ref].join(' ')))errors.push('potentially sensitive content: manual privacy review required');
  return errors;
}
export function auditDirectory(dir) {
  const violations=[], entries=[];
  if(!fs.existsSync(dir)) return {ok:false,violations:[{file:dir,error:'inbox directory missing'}],entries:0};
  for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.json')).sort()){
    let v;
    try{v=JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'))}catch{violations.push({file,error:'invalid JSON'});continue}
    const errors=validateEntry(v,file);
    for(const error of errors)violations.push({file,error});
    if(errors.length===0)entries.push(v);
  }
  const groups=new Map();
  for(const v of entries.filter(v=>v.status!=='rejected')){
    const key=v.entity_id+'::'+v.claim_key;
    const seen=groups.get(key)||[];
    for(const other of seen){
      if(other.value.trim()!==v.value.trim() && !(v.supersedes||[]).includes(other.id) && !(other.supersedes||[]).includes(v.id))
        violations.push({file:v.id+'.json',error:'SEMANTIC_CONFLICT with '+other.id+' on '+key});
    }
    seen.push(v);groups.set(key,seen);
  }
  return {ok:violations.length===0,violations,entries:entries.length,approved:entries.filter(v=>v.status==='approved').length};
}
export function main(args=process.argv.slice(2)){
  const at=args.indexOf('--dir');
  const dir=at>=0?args[at+1]:path.resolve('memory/inbox');
  const report=auditDirectory(dir);
  process.stdout.write(JSON.stringify(report,null,2)+'\n');
  if(!report.ok)process.exitCode=1;
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main();
