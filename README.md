## Projeto #Galeria de Fotos LBS
O projeto **#Galeria de Fotos LBS** foi desenvolvido por mim, Lucas Bargas, para estudo, com base em um conjunto de layouts que encontrei na web. Este projeto tem como objetivo apresentar uma galeria de fotos onde os usuários cadastrados podem compartilhar suas fotografias publicamente.

### Por que fiz este projeto?
Há alguns meses venho estudando com afinco tecnologias backend. Tenho focado, no momento, no Nodejs com Express e no banco de dados, MongoDB. Já tive a oportunidade de praticar estas tecnologias em outros projeto (que também estão publicamente no github), porém, até então, não havia feito uso do **Multer** que é um middleware que auxilia no upload de arquivos. Então, especialmente por este motivo, fiz esta galeria que requer uploads, no caso de fotos.
Agora pensando no front end, também tenho praticado dedicadamente o framework **Nextjs**, onde a renderização no lado do servidor se torna possível. Sendo assim, por conta disso, fiz a maioria das renderizações com SSG e SSR. Tive e ainda tenho algumas dificuldades, mas sem dúvida o aprendizado foi muito.

### Principais recursos do App
* Registo, login e logout de usuário;
* Edição de usuário, somente autenticado;
* Registro e exclusão de fotos, somente autenticado;
* A exclusão só pode ser feita por quem postou a foto.

### Tecnologias utilizadas
#### Backend
<table>
  <tr>
    <td>Nodejs</td>
    <td>Express-js</td>
    <td>Mongoose</td>
    <td>JWT</td>
    <td>Multer</td>
  </tr>
  <tr>
    <td>19.2</td>
    <td>4.18</td>
    <td>6.8</td>
    <td>9.0</td>
    <td>1.4</td>
  <tr>
</table>

### Como executar este Backend

#### Pré-requisitos
Instalar o Nodejs

#### Clone o repositório
```bash
git clone https://github.com/LucasBargas/lbs_photo_gallery_backend.git
```

#### Entre na pasta
```bash
cd lbs_photo_gallery_backend
```

#### Instale as dependências
```bash
npm install
```

#### Configure as variáveis de ambiente
```bash
# Crie um arquivo .env e passe os valores
MONGO_URL=value
JWT_SECRET=value
```

#### Execute o App
```bash
npm start
```

Gostaria de ver o repositório do Front end deste app?
[Clique aqui](https://github.com/LucasBargas/lbs_photo_gallery_frontend)
