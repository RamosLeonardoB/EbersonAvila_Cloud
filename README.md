# Site — Éberson Ávila

Site institucional mobile-first, feito em HTML + CSS + JavaScript puro (sem frameworks, sem build). Roda em qualquer hospedagem estática — GitHub Pages, Netlify, Vercel, etc.

## Estrutura

```
eberson-avila/
├── index.html
├── css/style.css
├── js/
│   ├── config.js   ← único arquivo que você mexe no dia a dia
│   ├── gallery.js
│   ├── agenda.js
│   └── main.js
└── img/            ← coloque as fotos aqui
```

Tudo que muda com frequência (fotos, agenda, WhatsApp, redes sociais) está centralizado em **`js/config.js`**.

---

## 1. Adicionar fotos

1. Salve o arquivo de imagem dentro da pasta `img/` (ex.: `img/show-boa-viagem.jpg`).
2. Abra `js/config.js` e acrescente uma linha no array `fotos`:

```js
fotos: [
  { src: "img/show-boa-viagem.jpg", legenda: "Casamento — Boa Viagem, ago/2026" },
  { src: "img/show-corporativo.jpg", legenda: "Evento corporativo — hotel Recife" },
]
```

Não precisa editar HTML nem CSS — a galeria e o lightbox (foto ampliada) são montados automaticamente a partir dessa lista.

> Dica: fotos entre 1200–1600px de largura já ficam nítidas e carregam rápido no celular. Comprima antes de subir (ex.: squoosh.app).

---

## 2. Conectar a Agenda de shows ao Google Agenda

A ideia: você continua usando o Google Agenda normalmente. Todo evento que tiver a etiqueta **`#show`** no título ou na descrição aparece automaticamente no site — os outros compromissos (pessoais, etc.) ficam de fora.

### Passo a passo

**a) Crie (ou use) uma agenda no Google Agenda**
- Pode ser sua agenda pessoal, ou melhor, uma agenda separada só para os shows (mais fácil de deixar pública sem expor sua rotina).
- Em [calendar.google.com](https://calendar.google.com), clique em **+** ao lado de "Outras agendas" → **Criar nova agenda**.

**b) Torne essa agenda pública**
- Configurações da agenda → **Permissões de acesso** → marque **"Disponibilizar publicamente"**.

**c) Pegue o ID da agenda**
- Na mesma tela, em **Integrar agenda**, copie o **ID da agenda** (algo como `abc123@group.calendar.google.com`).
- Cole em `js/config.js`, no campo `calendarId`.

**d) Crie uma chave de API do Google Cloud**
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um projeto (ou use um existente).
3. Em **APIs e serviços → Biblioteca**, ative a **Google Calendar API**.
4. Em **APIs e serviços → Credenciais**, clique em **Criar credenciais → Chave de API**.
5. **Restrinja a chave** (importante, é pública no site): em "Restrições de aplicativo", escolha **Referenciadores HTTP** e informe o domínio do site (ex.: `https://ebersonavila.github.io/*`). Em "Restrições de API", limite a **Google Calendar API**.
6. Cole a chave em `js/config.js`, no campo `apiKey`.

**e) Marcando um show**
- No Google Agenda, crie o evento normalmente: título, data, horário e **local** (o local aparece no card do site).
- No título ou na descrição, inclua a etiqueta `#show` — por exemplo: `Casamento Ana & João #show`.
- Pronto. Na próxima visita ao site, o evento aparece na seção Agenda automaticamente (a busca é feita a cada carregamento da página, não precisa reconstruir o site).

Se quiser trocar a etiqueta por outra (ex.: `[SHOW]`), altere o campo `etiqueta` em `config.js`.

---

## 3. Configurar o formulário de contato

O formulário usa o [FormSubmit](https://formsubmit.co/) — um serviço gratuito que envia o conteúdo do formulário direto para o seu e-mail, sem precisar de servidor.

1. Abra `index.html` e troque:
   ```html
   <form class="contato-form" id="contatoForm" action="https://formsubmit.co/SEU-EMAIL@dominio.com" ...>
   ```
   pelo seu e-mail real.
2. No primeiro envio de teste, o FormSubmit manda um e-mail de confirmação — clique no link para ativar.
3. (Opcional) depois de ativado, você pode trocar `SEU-EMAIL@dominio.com` por um hash de e-mail ofuscado que o próprio FormSubmit fornece, para não expor o endereço no código-fonte.

---

## 4. Configurar o WhatsApp

Em `js/config.js`:

```js
whatsapp: {
  numero: "5581900000000", // 55 + DDD + número, só dígitos
  mensagemPadrao: "Olá, Éberson! Vi seu site e quero saber sobre valores e disponibilidade para um show."
}
```

O botão "Chamar no WhatsApp" e o link do rodapé usam esse número automaticamente.

---

## 5. Publicar no GitHub Pages

1. Crie um repositório novo no GitHub e envie estes arquivos.
2. Em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
3. O site fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Como o site é 100% estático (sem backend), qualquer hospedagem gratuita similar (Netlify, Vercel, Cloudflare Pages) também funciona — basta arrastar a pasta ou conectar o repositório.

---

## Testar localmente

Não dá para abrir o `index.html` direto no navegador com duplo clique (o `fetch` da agenda é bloqueado por CORS em `file://`). Suba um servidor local simples:

```bash
cd eberson-avila
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.
