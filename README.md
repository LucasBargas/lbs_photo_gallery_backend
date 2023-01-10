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
* Nodejs;
* Express-js;
* MongoDB/Atlas com Mongoose;
* JWT (JSON Web Token);
* Multer.

Gostaria de ver o repositório do Front end deste app?
[Clique aqui](https://github.com/LucasBargas/lbs_photo_gallery_frontend)
