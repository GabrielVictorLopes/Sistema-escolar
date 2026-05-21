# 🎓 S.O.C.E – Sistema Operacional de Controle Escolar

Sistema escolar desenvolvido em **Angular + Angular Material**, com funcionalidades de cadastro de alunos, professores, fornecedores e gerenciamento de notas e faltas.

---

## 📌 Funcionalidades

✅ Cadastro de alunos  
✅ Cadastro de professores  
✅ Cadastro de fornecedores  
✅ Controle de notas  
✅ Controle de faltas  
✅ Interface moderna com Angular Material  
🚧 Banco de dados (em desenvolvimento)

---

## 🖼️ Preview do Sistema

Home do sistema com dashboard escolar e acesso rápido às funcionalidades.

---

## 🛠️ Tecnologias Utilizadas

- Angular (versão mais atual)
- Angular Material
- TypeScript
- HTML5
- CSS3

---

## 📥 Como baixar e rodar o projeto

### 1. Clonar o repositório

Abra o terminal (CMD, PowerShell, Git Bash ou terminal do VSCode) e execute:

```bash
git clone https://github.com/GabrielVictorLopes/Sistema-escolar.git
```

Depois entre na pasta:

```bash
cd Sistema-escolar
```

---

## 2. Instalar o Node.js

Antes de rodar o projeto, você precisa instalar o Node.js.

Baixe a versão **LTS**:

:contentReference[oaicite:0]{index=0}

Após instalar, reinicie o computador.

Verifique se instalou corretamente:

```bash
node -v
npm -v
```

Exemplo esperado:

```bash
v22.x.x
10.x.x
```

---

## 3. Instalar Angular CLI

No terminal execute:

```bash
npm install -g @angular/cli
```

Verifique a instalação:

```bash
ng version
```

---

## 4. Instalar dependências do projeto

Dentro da pasta do projeto rode:

```bash
npm install
```

Esse comando instalará todas as dependências necessárias.

---

## 5. Rodar o projeto

Execute:

```bash
ng serve
```

ou

```bash
npm start
```

Se o comando `ng` não funcionar:

```bash
npx ng serve
```

---

## 6. Abrir no navegador

Depois de iniciar o projeto, abra:

```txt
http://localhost:4200
```

---

## 🔄 Atualizar dependências (opcional)

Caso queira atualizar dependências:

```bash
npm update
```

---

## 🧹 Problemas comuns

### ❌ `ng is not recognized`

Instale o Angular CLI:

```bash
npm install -g @angular/cli
```

ou use:

```bash
npx ng serve
```

---

### ❌ `Cannot find module 'typescript'`

Execute:

```bash
npm install
```

---

### ❌ `This command is not available when running the Angular CLI outside a workspace`

Você não está na pasta do projeto.

Entre nela:

```bash
cd Sistema-escolar
```

Verifique se existe:

```bash
angular.json
package.json
src
```

---

### ❌ Porta 4200 ocupada

Rode em outra porta:

```bash
ng serve --port 4300
```

Abra:

```txt
http://localhost:4300
```

---

## 📁 Estrutura do Projeto

```txt
src/
 ├── app/
 │   ├── pages/
 │   │   ├── aluno/
 │   │   ├── professor/
 │   │   ├── fornecedor/
 │   │   ├── notas/
 │   │   ├── faltas/
 │   │   └── home/
 │   ├── components/
 │   ├── app.routes.ts
 │   ├── app.ts
 │   ├── app.html
 │   └── app.css
 ├── public/
 └── styles.css
```

---

## 👨‍💻 Desenvolvedor

Desenvolvido por Gabriel Victor Lopes.

GitHub:

:contentReference[oaicite:1]{index=1}

---

## 🚀 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch:

```bash
git checkout -b minha-feature
```

3. Commit das alterações:

```bash
git commit -m "Minha melhoria"
```

4. Push:

```bash
git push origin minha-feature
```

5. Abra um Pull Request

---

## 📄 Licença

Projeto para fins educacionais.
