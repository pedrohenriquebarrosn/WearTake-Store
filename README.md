# WearTake — Vitrine educacional de moda

Aplicação de catálogo e carrinho feita com **HTML, CSS e JavaScript puro**, originalmente iniciada em 2022 durante estudos de desenvolvimento web e recuperada em uma branch separada em outubro de 2026.

## O que funciona na versão recuperada

- Exibição dos seis produtos do exercício, com imagens e valores ilustrativos.
- Filtro pelas categorias **Todos, Acessórios, Camisetas e Jaquetas**.
- Pesquisa por nome, descrição e categoria, com combinação de busca e filtro.
- Adição ao carrinho, incremento e redução de unidades, remoção por produto, limpeza e cálculo do total.
- Carrinho salvo no `localStorage`, restaurado após atualizar a página, com validação dos valores armazenados.
- Interface responsiva, campos identificados, navegação por teclado e atenção a movimento reduzido.

**Atenção:** demonstração **educacional**, não loja comercial. Não existem contas, pedidos, pagamentos, estoque sincronizado ou garantia de disponibilidade dos produtos.

## Executar localmente

Sem instalação de dependências para a aplicação:

```bash
git clone https://github.com/pedrohenriquebarrosn/WearTake-Store.git
cd WearTake-Store
git checkout fix/restore-store-20261012
python3 -m http.server 4173
```

Abra http://localhost:4173.

## Testar

A integração contínua da branch utiliza Node.js para checagem de sintaxe e Playwright/Chromium para testes de filtro, pesquisa, carrinho, persistência, imagens e layout mobile. Consulte a aba [Actions](https://github.com/pedrohenriquebarrosn/WearTake-Store/actions).

O código está na branch `fix/restore-store-20261012`, sem alterar a versão histórica em `master`.

## Evolução e limites

Foram eliminados problemas na remoção de itens (antes removia sempre o primeiro), no cálculo monetário baseado em texto, na ausência de filtros e pesquisa funcionais, e no layout sem tratamento mobile.

A recuperação mantém o caráter didático em vez de acrescentar desnecessariamente React, Supabase ou backend. As melhorias de 2026 devem ser descritas como **modernização do projeto original**, não como trabalho desenvolvido integralmente em 2022.

**Preview hospedado:** https://weartake-store-preview.vercel.app/ — Vercel confirmou deploy READY e domínio associado, com autenticação de visitante desativada. O site ainda não foi validado em navegador externo independente; os testes automatizados de funcionalidade e mobile passaram no GitHub Actions.
