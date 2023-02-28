

import React from 'react';

function Navbar() {
  return (
    <div>

        <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Etherium</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Bitcoin</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Sandbox</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled">Dogecoin</a>
  </li>
</ul>

     </div>
  );
}

export default Navbar;