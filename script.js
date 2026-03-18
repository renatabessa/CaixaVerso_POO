
const botaoAdicionar = document.getElementById("btn_form");
const formularioCadastro = document.getElementById("cadastro-form");
const cardapioArea = document.querySelector(".cardapio-area");

const produtos = [];

class Produto {
  constructor(nome, descricao, preco, categoria) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
    //this.imagem = imagem; // Adicionei a propriedade de imagem, mas ainda não está sendo usada
  } 
}   

window.onload = function() {
    const produtosArmazenados = localStorage.getItem("produtos");
    if (produtosArmazenados) {
        produtos.push(...JSON.parse(produtosArmazenados));
    }
};

console.log(produtos);


botaoAdicionar.addEventListener("click", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const categoria = document.getElementById("categoria").value;
    
    cadastrarProduto(new Produto(nome, descricao, preco, categoria));
    console.log(nome, descricao, preco, categoria);
    armazenarProdutos();
});

function cadastrarProduto(produto) {
    produtos.push(produto);
    console.log(produtos);
}

function armazenarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}
