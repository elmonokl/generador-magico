// src/js/main.js

// Elementos
const lengthRange = document.getElementById('length');
const lengthNum = document.getElementById('lengthNum');
const lenLabel = document.getElementById('lenLabel');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const randomizeBtn = document.getElementById('randomizeBtn');
const passwordBox = document.getElementById('password');
const copyBtn = document.getElementById('copyBtn');
const regenBtn = document.getElementById('regenBtn');
const strengthEl = document.getElementById('strength');
const entropyEl = document.getElementById('entropy');
const copiedMsg = document.getElementById('copiedMsg');

// Conjuntos de caracteres
const sets = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: "!@#$%^&*()-_=+[]{};:,.<>?/|~"
};

// Sincronizar range y number
function syncLength(val){
  lengthRange.value = val;
  lengthNum.value = val;
  lenLabel.textContent = val;
}
lengthRange.addEventListener('input', e => syncLength(e.target.value));
lengthNum.addEventListener('input', e => {
  let v = Number(e.target.value) || 8;
  if(v < 8) v = 8; 
  if(v > 20) v = 20;
  syncLength(v);
});

// Generador seguro
function secureRandomInt(max){
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(){
  const len = Number(lengthRange.value);
  let pool = sets.lower; 
  if(uppercase.checked) pool += sets.upper;
  if(numbers.checked) pool += sets.number;
  if(symbols.checked) pool += sets.symbol;

  if(!pool.length) pool = sets.lower;

  const required = [];
  if(uppercase.checked) required.push(sets.upper);
  if(numbers.checked) required.push(sets.number);
  if(symbols.checked) required.push(sets.symbol);
  required.push(sets.lower);

  const pwd = [];

  for(const r of required){
    pwd.push(r[secureRandomInt(r.length)]);
  }

  for(let i = pwd.length; i < len; i++){
    pwd.push(pool[secureRandomInt(pool.length)]);
  }

  for(let i = pwd.length - 1; i > 0; i--){
    const j = secureRandomInt(i + 1);
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }

  return pwd.join('');
}

function estimateEntropy(length, poolSize){
  return Math.round(length * Math.log2(poolSize));
}

function updateStrength(pwd){
  let pool = sets.lower.length;
  if(uppercase.checked) pool += sets.upper.length;
  if(numbers.checked) pool += sets.number.length;
  if(symbols.checked) pool += sets.symbol.length;
  const ent = estimateEntropy(pwd.length, pool);
  entropyEl.textContent = ent;
  let label = 'Débil';
  if(ent >= 128) label = 'Muy fuerte';
  else if(ent >= 80) label = 'Fuerte';
  else if(ent >= 60) label = 'Medio';
  strengthEl.textContent = label;
}

function setPassword(pwd){
  passwordBox.textContent = pwd;
  passwordBox.focus();
  updateStrength(pwd);
  copiedMsg.style.display = 'none';
}

generateBtn.addEventListener('click', () => {
  const pwd = generatePassword();
  setPassword(pwd);
});

randomizeBtn.addEventListener('click', async () => {
  const pwd = generatePassword();
  setPassword(pwd);
  try {
    await navigator.clipboard.writeText(pwd);
    copiedMsg.style.display = 'inline';
    setTimeout(() => copiedMsg.style.display = 'none', 2200);
  } catch(e) {}
});

regenBtn.addEventListener('click', () => {
  const pwd = generatePassword();
  setPassword(pwd);
});

copyBtn.addEventListener('click', async () => {
  const text = passwordBox.textContent.trim();
  if(!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copiedMsg.style.display = 'inline';
    setTimeout(() => copiedMsg.style.display = 'none', 2200);
  } catch(e) {
    const range = document.createRange();
    range.selectNodeContents(passwordBox);
    const sel = window.getSelection();
    sel.removeAllRanges(); 
    sel.addRange(range);
    try { 
      document.execCommand('copy'); 
      copiedMsg.style.display = 'inline'; 
      setTimeout(() => copiedMsg.style.display = 'none', 2200);
    } catch(err) {}
    sel.removeAllRanges();
  }
});

// generar inicial
setPassword('Pulsa "Generar contraseña"');