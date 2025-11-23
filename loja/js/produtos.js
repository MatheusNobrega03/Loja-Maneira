console.log("JS carregado:", document.getElementById("produtos"));

fetch("../../roupas.json")
  .then(response => response.json())
  .then(produtos => {
    const container = document.getElementById("produtos");

    container.innerHTML = produtos
      .map(produto => {
        return `
        <div class="produtos_container">
            <img class="produtos_section_img_up" src="${produto.imgUp}" />
            <img class="produtos_section_img_down" src="${produto.imgDown}" />

            <div class="produtos_section_text">
                <p>${produto.nome}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
            </div>
        </div>
        `;
      })
      .join("");
  })
  .catch(error => console.error("Erro ao carregar JSON:", error));
