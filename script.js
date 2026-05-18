// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab, .panel').forEach(el => el.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
    msg('');
  });
});

function switchTab(tabName, event) {
  event.preventDefault();
  document.querySelectorAll('.tab, .panel').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
  msg('');
}

function msg(text) {
  const msgEl = document.getElementById('msg');
  msgEl.textContent = text;
  if (text.includes('✓') || text.includes('Welcome')) {
    msgEl.classList.add('success');
    msgEl.classList.remove('error');
  } else if (text) {
    msgEl.classList.add('error');
    msgEl.classList.remove('success');
  }
}

// ── LOCALSTORAGE HELPERS ──
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// ── REGISTER ──
function register(event) {
  event.preventDefault();
  const name  = document.getElementById('r-name').value.trim();
  const email = document.getElementById('r-email').value.trim();
  const pass  = document.getElementById('r-pass').value;

  if (!name || !email || !pass) return msg('Veuillez remplir tous les champs.');
  if (!email.includes('@'))     return msg('Entrez un email valide.');
  if (pass.length < 8)          return msg('Le mot de passe doit contenir au moins 8 caractères.');

  const users = getUsers();

  if (users.find(u => u.email === email)) return msg('Cet email est déjà inscrit.');

  users.push({ name, email, pass });
  saveUsers(users);

  msg('✓ Compte créé ! Vous pouvez maintenant vous connecter.');
  
  // Clear form
  document.getElementById('r-name').value = '';
  document.getElementById('r-email').value = '';
  document.getElementById('r-pass').value = '';
  
  // Switch to login after 2 seconds
  setTimeout(() => switchTab('login', new Event('click')), 2000);
}

// ── LOGIN ──
function login(event) {
  event.preventDefault();
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;

  if (!email || !pass)      return msg('Veuillez remplir tous les champs.');
  if (!email.includes('@')) return msg('Entrez un email valide.');

  const users = getUsers();
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) return msg('Email ou mot de passe incorrect.');

  msg(`✓ Bienvenue ${user.name} !`);
  
  // Clear form
  document.getElementById('l-email').value = '';
  document.getElementById('l-pass').value = '';
}

// ── SOCIAL LOGIN ──
function loginGoogle() {
  msg('🔄 Redirection vers Google...');
  setTimeout(() => msg('Connexion avec Google en cours...'), 1000);
}

// ── PASSWORD TOGGLE ──
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const btn = event.target;
  
  if (field.type === "password") {
    field.type = "text";
    btn.textContent = "🙈";
  } else {
    field.type = "password";
    btn.textContent = "👁️";
  }
}