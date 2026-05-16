// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab, .panel').forEach(el => el.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
    msg('');
  });
});

function msg(text) {
  document.getElementById('msg').textContent = text;
}

// ── LOCALSTORAGE HELPERS ──
// localStorage stores everything as strings, so we use JSON to save/load an array of users

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
  // localStorage.getItem('users') reads the saved data
  // if nothing saved yet, we use '[]' (empty array) as default
  // JSON.parse converts the string back into a real JS array
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
  // JSON.stringify converts the array into a string so localStorage can store it
}

// ── REGISTER ──
function register() {
  const name  = document.getElementById('r-name').value.trim();
  const email = document.getElementById('r-email').value.trim();
  const pass  = document.getElementById('r-pass').value;

  if (!name || !email || !pass) return msg('Please fill in all fields.');
  if (!email.includes('@'))     return msg('Enter a valid email.');
  if (pass.length < 8)          return msg('Password must be at least 8 characters.');

  const users = getUsers();

  // Check if email already registered
  if (users.find(u => u.email === email)) return msg('This email is already registered.');

  // Save the new user
  users.push({ name, email, pass });
  saveUsers(users);
  // users array now looks like: [{ name: "John", email: "j@j.com", pass: "abc123!A" }, ...]

  msg('✓ Account created! You can now sign in.');
}

// ── LOGIN ──
function login() {
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;

  if (!email || !pass)      return msg('Please fill in all fields.');
  if (!email.includes('@')) return msg('Enter a valid email.');

  const users = getUsers();

  // Look for a user with matching email AND password
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) return msg('Wrong email or password.');

  msg(`✓ Welcome back, ${user.name}!`);
}