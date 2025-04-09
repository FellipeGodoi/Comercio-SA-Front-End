# Comércio SA 

Pequena aplicação web com o intuito de demonstrar conhecimento no uso do React com TypeScript.
<br/> Nela, o usuário pode realizar o cadastro, edição e consulta de clientes e seus respectivos contatos salvos.
<br/> Esta aplicação está conectada a este back-end:
https://github.com/FellipeGodoi/Comercio-SA-Back-End

### Tecnologias utilizadas 
- React
- TypeScript
- Vite

<b>Bibliotecas</b>
- React Router Dom - Navegação entre paginas
- React Bootstrap - Auxilo de estilização e responsividade
- Axios - para requisições

## Pré-requisitos
Antes de começar, certifique-se de ter o Node.js e o npm instalados na sua máquina, e que o back-end esteja em execução.

### Como rodar o projeto

1. Clone o repositório
```
git clone https://github.com/FellipeGodoi/Comercio-SA-Back-End.git
```
2. Acesse a pasta do projeto e instale as dependências:
```
npm install
```
3. Inicie o servidor de desenvolvimento
```
npm run dev
```
4. No seu navegador acesse
```
   http://localhost:5173
```
5. A tela inicial deverá exibir uma lista dos clientes previamente cadastrados, com um campo de pesquisa.

## Estrutura do projeto
```graphql
src
├── components/              # Componentes reutilizáveis da interface
│   ├── header/              # Cabeçalho da aplicação
│   ├── inputs/              # Campos de formulário personalizados
│   ├── lists/               # Componentes de listagem de dados
│   └── modals/              # Modais reutilizáveis
│
├── data/                    # Arquivos estáticos e tipos de dados
│   ├── images/              # Imagens utilizadas no projeto
│   └── types/               # Tipagens TypeScript usadas no app
│
├── pages/                   # Páginas principais da aplicação
│   ├── listClientPage/      # Página de listagem de clientes
│   └── notFoundPage/        # Página de erro 404
│
├── utils/                   # Funções utilitárias e configuração
│   ├── axios/               # Configuração do Axios para requisições HTTP
│   │   └── axiosClient.ts   # Cliente Axios com baseURL e interceptadores
│   ├── routes/              # Rotas da aplicação com React Router
│   ├── validations/         # Validações de inputs
│   └── services/            # Serviços de integração com o backend
│
├── App.css                 # Estilos globais da aplicação
├── App.tsx                 # Componente raiz da aplicação
├── index.css               # Estilização base (reset, fonts, etc)
├── main.tsx                # Ponto de entrada da aplicação React
└── vite-env.d.ts           # Arquivo gerado pelo Vite com definições de tipos
```

## Requisitos do Sistema - Cadastro de Clientes e Contatos

### Requisitos Funcionais (RF)

- [x] **RF01:** O sistema deve permitir o cadastro de clientes com os seguintes dados:  
  Nome, CPF, Data de Nascimento e Endereço.

- [x] **RF02:** O sistema deve permitir a edição dos dados de um cliente cadastrado.

- [x] **RF03:** O sistema deve permitir a exclusão de um cliente cadastrado.

- [x] **RF04:** O sistema deve permitir a listagem de todos os clientes cadastrados.

- [x] **RF05:** O sistema deve permitir a busca de um cliente pelo Nome ou CPF.

- [x] **RF06:** O sistema deve permitir o cadastro de contatos para um cliente, contendo os seguintes dados:  
  Tipo do Contato (Telefone, E-mail), Valor do Contato (número ou e-mail) e Observação.

- [x] **RF07:** O sistema deve permitir a edição dos contatos de um cliente.

- [x] **RF08:** O sistema deve permitir a exclusão de um contato de um cliente.

- [x] **RF09:** O sistema deve permitir a listagem de todos os contatos de um cliente específico.

---

##  Regras de Negócio (RN)

- [x] **RN01:** Os campos **Nome** e **CPF** são obrigatórios no cadastro do cliente.

- [x] **RN02:** Os campos **Tipo do Contato** e **Valor do Contato** são obrigatórios no cadastro do contato.

- [x] **RN03:** O CPF informado deve ser **único** no sistema.

- [x] **RN04:** O campo **Nome do cliente** não pode estar vazio.

- [x] **RN05:** A **Data de Nascimento** deve ser válida.

- [x] **RN06:** Um cliente pode ter **mais de um contato** cadastrado.

- [x] **RN07:** Ao excluir um cliente, **todos os seus contatos** devem ser removidos do sistema.

- [x] **RN08:** O sistema deve **validar os dados informados** antes de permitir o cadastro ou edição.


<img src="src/data/images/Logo-Comercio-SA.png" width="200"/>


