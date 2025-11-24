function home() {
    window.location.href = "../index.html";
}
const total = document.getElementById("total");
const totalValor = roupas
    .reduce((acc, produto) => acc + (produto.quantidade * produto.preco), 0)
    .toFixed(2);

total.innerHTML = `
                          <p>
                            R$ ${totalValor}
                          </p>
                        `;

function remover(id) {
    let carrinho = JSON.parse(sessionStorage.getItem("Carrinho")) || [];
    const existente = carrinho.find(item => item.id == id);
    if (existente && existente.quantidade > 1) {
        existente.quantidade -= 1;
    } else {
        carrinho = carrinho.filter(item => item.id != id);
    }
    sessionStorage.setItem("Carrinho", JSON.stringify(carrinho));
    window.location.reload()
}



function finalizar_compra() {
    const totalValor = roupas
        .reduce((acc, produto) => acc + (produto.quantidade * produto.preco), 0)
        .toFixed(2);
    if (totalValor > 0) {
        alert("Compra Realizada!");
        sessionStorage.removeItem("Carrinho");
        window.location.href = "../index.html"
    } else {
        alert("Pra comprar tem que ter algo né menó");
    }

}

const button = document.getElementById("comprar");
const buttonValor = roupas
    .reduce((acc, produto) => acc + (produto.quantidade * produto.preco), 0)
    .toFixed(2);
if (buttonValor > 0) {
    button.innerHTML = `
                              <button class="comprar_input" onclick="finalizar_compra()"> Comprar </button>
                            `;
} else {
    button.innerHTML = `
                              <button class="comprar_input disabled" disabled="disabled"> Comprar </button>
                            `;
}


let roupas = JSON.parse(sessionStorage.getItem("Carrinho")); //*procura se existe json roupa dentro do local
const container = document.getElementById("carrinho");
container.innerHTML = roupas.map(produto => `
                    <div class="produtos_container">
                      <img class="produtos_section_img_up" src="${produto.img}" />
                    
                      <div class="produtos_section_text">
                          <p>${produto.nome}</p>
                          <p>R$ ${produto.preco.toFixed(2)}</p>
                      </div>
                      
                      <div class="produtos_section_text">
                          <p>${produto.quantidade}</p>
                      </div>
                      <div class="produtos_section_text">
                          <p>Sub total:</p>
                          <p>R$ ${(produto.quantidade * produto.preco).toFixed(2)}</p>
                      </div>
                      <div class="produtos_section_text">
                          <button class="remover_item" onclick="remover(${produto.id})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M292.31-140Q262-140 241-161q-21-21-21-51.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31Zm83.85-140h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360Z"/></svg></button>
                      </div>
                    </div>
                `)
    .join("");
