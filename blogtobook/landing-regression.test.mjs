import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';

const page=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const script=readFileSync(new URL('./funnel-analytics.js',import.meta.url),'utf8');

function setup(url){
  const location=new URL(url),saved={},calls=[],window={};
  const context={window,location,URL,URLSearchParams,crypto:webcrypto,document:{referrer:''},history:{replaceState(){}},localStorage:{getItem:key=>saved[key],setItem:(key,value)=>{saved[key]=value}},fetch:(...args)=>{calls.push(args);return Promise.resolve()},JSON};
  vm.runInNewContext(script,context);
  return {window,calls};
}

test('landing page carries one journey ID and attribution into hosted CTA',()=>{
  const landing=setup('https://apps.ebmapps.cc/blogtobook/?utm_source=launch&utm_medium=email&utm_campaign=seven-day');
  const url=landing.window.btbTelemetry.link('https://blogtobook.fly.dev/');
  const hosted=new URL(url);
  const app=setup(url);
  assert.equal(app.window.btbTelemetry.state.id,landing.window.btbTelemetry.state.id);
  assert.equal(app.window.btbTelemetry.state.source,'launch');
  assert.equal(hosted.hash.includes('btb_id='),true);
  assert.equal(app.window.btbTelemetry.headers()['x-btb-journey-id'],landing.window.btbTelemetry.state.id);
});

test('landing messaging is public-Substack specific without claiming EPUB completion',()=>{
  assert.match(page,/public blog or Substack archive/i);
  assert.match(page,/81 publicly discoverable articles/i);
  assert.match(page,/does not bypass paid or private/i);
  assert.doesNotMatch(page,/81[^<]*(?:exported|chapters)/i);
});
