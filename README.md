<h2 style="color:#1267fc"> Desafio DevxSolutions Heygon Lago </h2>
Esse projeto é destinado ao desafio proposto para a DevxSolutions com o objetivo de uma vaga para desenvolvedor Fullstack com nodejs e Reactjs
<br/>
<br/>
<h2 style="color:#1267fc"> Setup </h2>
Algumas configurações devem ser executadas antes de rodar o projeto,
Essas configurações poderiam ser centralizadas em um .env geral para facilitar, mas nesse momento eu achei melhor
informar os arquivos para alterar, tendo em vista que são simples os passos.
<br/>
<br/>
<h3 style="color:#1267fc"> Configurar ip do backend </h3>
No arquivo docker-compose.yml temos as configurações de como o docker deve criar os containers que servirão o projeto e suas respectivas portas de acesso, essas portas estão identificadas com a flag <strong>-ports</strong>, que podem ser alteradas de acordo com a nescessidade.
<br/>
Dentro da pasta <strong>Backend</strong> temos o arquivo <strong>.env</strong> que se encontra no caminho backend/src/, dentro dele temos a configuração de como o backend vai se comunicar com o banco de dados em Postgres. Podemos alterar o ip do banco bem como a porta de acesso e adicionar as informações de login e senha.
<br/>
<br/>
<h3 style="color:#1267fc"> Postgres </h3>
A porta padrão para o Postgres é a <strong>5432</strong>, caso aconteça algum conflito com alguma instância do Postgres que já está em execução, essa porta pode ser alterada para por exemplo <strong>5433:5432</strong> onde 5433(porta que será acessada):5432(porta padrão dentro do container, que não pode ser alterado).
<br/>
Dentro da pasta <strong>Web</strong>, temos o arquivo <strong>api.ts</strong>, que indica para o nosso frontend qual é o ip do backend que ele deve consultar os dados. Para alterar esse ip, precisamos acessar o arquivo no caminho <strong>web/src/services/api.ts</strong>, e informar o novo ip.
<br/>
<br/>
<h3 style="color:#1267fc"> Nodejs </h3>
Seguindo a mesma ideia do Postgres, o Nodejs também precisa reservar uma porta para acesso, atualmente estamos chamando a porta <strong>3678</strong> que pode ser alterado para por exemplo <strong>9001:3000</strong>.
<br/>
<br/>
<h3 style="color:#1267fc"> Reactjs </h3>
Seguindo a mesma ideia dos anteriores, a porta do react pode ser alterado para por exemplo <strong>9001:3000</strong>.
<br/>
<br/>
<h3 style="color:#1267fc"> Rodando o projeto </h3>
Com as configurações das portas prontas, para rodar o projeto execute o comando:
<code>docker-compose up -d</code>
Esse comando vai iniciar os containers do Postgres e criar o banco de dados, o Backend Nodejs e o Frontend React. O sistema frontend pode ser acessado pelo login <code>http://localhost:3001</code>. Além do front end, temos outros links que podem ser acessados como a documentação de api que pode ser acessado pelo link <code>http://localhost:3678/doc</code> e o link <code>http://localhost:3678/files/urlImage</code> que é usado para acessar as imagens trocando a palavra urlImage para o nome da imagem cadastrado no banco. Além disso no arquivo <code>package.json</code> existem alguns comandos para executar o teste automatizado e atualizar a documentação.


<br/>
<h3 style="color:#1267fc"> Acessando o front </h3>
<p>O front possui uma tela com os campos de login e senha, para acessa-lo podemos usar o acesso padrão <code>mariusz.mutschler@example.com</code> e a senha <code>jomama</code> esse login e senha vão ser gerados depois que executar o comando <code>npm test</code> no backend. Caso no momento da execução do <strong>docker-compose up -d</strong> os comandos de teste de seed não sejam executados, eles podem ser executados manualmente ao acessar o terminal do containêr</p>

<br/>
<h3 style="color:#1267fc"> Rodando cada interface individualmente  </h3>
<p>Caso de algum erro no docker e os containers não sejam criados, é possível rodar cada interface <strong>Backend</strong> e <strong>Frontend</strong> individualmente.</p>
<p>Para executar o <strong>Backend</strong> devemos fazer as alterações indicadas acima e entrar na sua pasta, via terminal, para rodar o comando <code>npm install</code> e em seguida o comando <code>node src/index.js</code> e esperar a execução.</p>
<br/>
<p>Para executar o <strong>Frontend</strong> devemos fazer as alterações indicadas acima e entrar na sua pasta, via terminal, para rodar os mesmos comandos do <strong>Backend</strong>, <code>yarn install</code> e em seguida o comando <code>yarn start</code> e esperar a execução.</p>

<br/>
<p>No docker compose, antes de disponibilizar o contêiner backend para acesso, os comandos de teste e seed são executados. Esses comandos vão garantir que o backend possa ser disponibilizado sem falhas e com os devidos dados para serem apresentados no front.</p>
<br/>

