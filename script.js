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

function login() {
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;
  if (!email || !pass)             return msg('Please fill in all fields.');
  if (!email.includes('@'))        return msg('Enter a valid email.');
  msg('✓ Signed in successfully!');
}

function register() {
  const name  = document.getElementById('r-name').value.trim();
  const email = document.getElementById('r-email').value.trim();
  const pass  = document.getElementById('r-pass').value;
  if (!name || !email || !pass)    return msg('Please fill in all fields.');
  if (!email.includes('@'))        return msg('Enter a valid email.');
  if (pass.length < 8)             return msg('Password must be at least 8 characters.');
  msg('✓ Account created!');
}