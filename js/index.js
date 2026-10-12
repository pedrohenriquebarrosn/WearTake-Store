// WearTake: intentionally framework-free educational storefront.
// Illustrative catalog only: no orders, payment, accounts or inventory.
const products = [
  { id: 1, img: "./img/jaqueta.svg", name: "Lightweight Jacket", description: "Jaqueta leve com estilo vibrante para os dias mais frios.", price: 100, category: "Jaquetas" },
  { id: 2, img: "./img/gorro.svg", name: "Black Hat", description: "Gorro de malha confortável para o dia a dia.", price: 100, category: "Acessórios" },
  { id: 3, img: "./img/mascara.svg", name: "Mask", description: "Máscara de tecido com ajuste confortável.", price: 40, category: "Acessórios" },
  { id: 4, img: "./img/camiseta_preta.svg", name: "T-Shirt", description: "Camiseta preta versátil, com corte clássico.", price: 100, category: "Camisetas" },
  { id: 5, img: "./img/camiseta_branca.svg", name: "Short-Sleeve T-Shirt", description: "Camiseta branca de manga curta, essencial no guarda-roupa.", price: 100, category: "Camisetas" },
  { id: 6, img: "./img/moletom.svg", name: "Champion Packable Jacket", description: "Jaqueta prática e leve para dias de clima variável.", price: 100, category: "Jaquetas" },
];

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const storageKey = "weartake_demo_cart_v1";
const nodes = {
  products: document.querySelector("#products"),
  results: document.querySelector("#catalog-count"),
  emptyResults: document.querySelector("#empty-results"),
  search: document.querySelector("#product-search"),
  categories: document.querySelectorAll("[data-category]"),
  cart: document.querySelector("#cart-items"),
  cartEmpty: document.querySelector("#cart-empty"),
  cartCount: document.querySelector("#cart-count"),
  cartQuantity: document.querySelector("#cart-quantity"),
  cartTotal: document.querySelector("#cart-total"),
  clearCart: document.querySelector("#clear-cart"),
};

let activeCategory = "Todos";
let searchText = "";

// Validate persisted IDs and quantities; never trust localStorage as catalog data.
function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const restored = {};
    for (const product of products) {
      const quantity = parsed[product.id];
      if (Number.isInteger(quantity) && quantity > 0) {
        restored[product.id] = Math.min(quantity, 99);
      }
    }
    return restored;
  } catch { return {}; }
}
let cart = loadCart();

function persistCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); }
  catch { /* Local demo stays usable when browser storage is disabled. */ }
}

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function makeElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderProducts() {
  const matches = products.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const searchable = normalize(product.name + " " + product.description + " " + product.category);
    return matchesCategory && searchable.includes(normalize(searchText));
  });
  nodes.products.replaceChildren();
  for (const product of matches) {
    const article = makeElement("article", "product-card");
    const imageBox = makeElement("div", "product-image");
    const image = makeElement("img");
    image.src = product.img;
    image.alt = product.name;
    image.loading = "lazy";
    image.width = 250;
    image.height = 200;
    imageBox.append(image);

    const content = makeElement("div", "product-content");
    const category = makeElement("span", "product-category", product.category);
    const title = makeElement("h2", "product-title", product.name);
    const description = makeElement("p", "product-description", product.description);
    const footer = makeElement("div", "product-footer");
    const price = makeElement("strong", "product-price", currency.format(product.price));
    const button = makeElement("button", "add-to-cart", "Adicionar");
    button.type = "button";
    button.dataset.addProduct = String(product.id);
    button.setAttribute("aria-label", "Adicionar " + product.name + " à sacola");
    footer.append(price, button);
    content.append(category, title, description, footer);
    article.append(imageBox, content);
    nodes.products.append(article);
  }
  nodes.results.textContent = matches.length + (matches.length === 1 ? " produto" : " produtos");
  nodes.emptyResults.hidden = matches.length !== 0;
  for (const button of nodes.categories) {
    const active = button.dataset.category === activeCategory;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function renderCart() {
  nodes.cart.replaceChildren();
  let count = 0;
  let total = 0;
  for (const product of products) {
    const quantity = cart[product.id] || 0;
    if (!quantity) continue;
    count += quantity;
    total += quantity * product.price;
    const item = makeElement("li", "cart-item");
    const image = makeElement("img", "cart-image");
    image.src = product.img;
    image.alt = "";
    image.width = 68;
    image.height = 68;
    const info = makeElement("div", "cart-info");
    const name = makeElement("strong", "cart-product-name", product.name);
    const amount = makeElement("span", "cart-product-price", currency.format(product.price));
    const controls = makeElement("div", "quantity-controls");
    const decrease = makeElement("button", "quantity-button", "−");
    decrease.type = "button";
    decrease.dataset.decrease = String(product.id);
    decrease.setAttribute("aria-label", "Diminuir quantidade de " + product.name);
    const number = makeElement("span", "quantity-number", String(quantity));
    const increase = makeElement("button", "quantity-button", "+");
    increase.type = "button";
    increase.dataset.increase = String(product.id);
    increase.disabled = quantity >= 99;
    increase.setAttribute("aria-label", "Aumentar quantidade de " + product.name);
    const remove = makeElement("button", "remove-button", "Remover");
    remove.type = "button";
    remove.dataset.remove = String(product.id);
    remove.setAttribute("aria-label", "Remover " + product.name + " da sacola");
    controls.append(decrease, number, increase, remove);
    info.append(name, amount, controls);
    item.append(image, info);
    nodes.cart.append(item);
  }
  nodes.cartCount.textContent = String(count);
  nodes.cartQuantity.textContent = String(count);
  nodes.cartTotal.textContent = currency.format(total);
  nodes.cartEmpty.hidden = count !== 0;
  nodes.clearCart.disabled = count === 0;
}

function changeQuantity(id, change) {
  if (!products.some((product) => product.id === id)) return;
  const next = Math.min(99, Math.max(0, (cart[id] || 0) + change));
  if (next) cart[id] = next;
  else delete cart[id];
  persistCart();
  renderCart();
}

nodes.products.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-add-product]");
  if (button) changeQuantity(Number(button.dataset.addProduct), 1);
});
nodes.cart.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.increase) changeQuantity(Number(button.dataset.increase), 1);
  if (button.dataset.decrease) changeQuantity(Number(button.dataset.decrease), -1);
  if (button.dataset.remove) {
    delete cart[Number(button.dataset.remove)];
    persistCart();
    renderCart();
  }
});
nodes.clearCart.addEventListener("click", () => {
  cart = {};
  persistCart();
  renderCart();
});
nodes.search.addEventListener("input", (event) => {
  searchText = event.target.value;
  renderProducts();
});
for (const button of nodes.categories) {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    renderProducts();
  });
}

renderProducts();
renderCart();
