class Reserva{
    constructor(id, id_cliente, status, dataEntrada, dataSaida){
        this.id = id;
        this.id_cliente = id_cliente;
        this.status = status;                   //Status: pendente, adiada, realizada, cancelada
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;  

    }
}



class Funcionario{
    constructor(id, nome, cpf, email, senha){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;

    }
}



class Cliente{
    constructor(id, nome, dataNascimento, cpf, email, senha){
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;

    }

}



class Quartos{
    constructor(numeroQuarto, descricao, quantasCamas, precoPorNoite, quantidadeDisponivel){
        this.numeroQuarto = numeroQuarto;
        this.desricao = descricao;
        this.quantasCamas = quantasCamas;
        this.precoPorNoite = precoPorNoite;
        this.quantidadeDisponivel = quantidadeDisponivel;

    }
}


class Sistema{
    constructor(){
        this.listaFuncionarios = [];
        this.listaReservas = [];
        this.listaQuartos = [];
        this.listaClientes = [];
        this.usuario = null;

    }               
    //Criando listas para armazenar as informacoes

    //metodo de limpar a tela 
    limparTela(){
        console.clear();
    }
    
    
    //funcao de gerar ID aleatorio de 5 digitos
    //ID's de comeco 0 serao funcionarios
    //ID's de comeco 1 serao clientes
    
    gerarId(prefixo, lista) {
        let idUnico = false;
        let id;
        while(!idUnico){
            let tamanhoAleatorio = 4; // Quantidade de números aleatórios
            id = String(prefixo); // Começa com o prefixo como string
            for (let i = 0; i < tamanhoAleatorio; i++) {
                let numeroAleatorio = Math.floor(Math.random() * 10); // Gera número entre 0 e 9
                id += numeroAleatorio; // adiciona o número ao ID
                }
            
            //Para conferir se o id ja existe
            idUnico = true;
            for (let n = 0; n < lista.length; n++){
                if(id == lista[n][0]){
                    idUnico = false;
                    break;
                }
            }
        }
        return Number(id);  
    }
        

    //Cadastro de funcionario
    
    
    cadastrarFuncionario(nome, dataNascimento, cpf, email, senha){
        const id = this.gerarId(0, this.listaFuncionarios);
        const funcionario = new Funcionario(id, nome, dataNascimento, cpf, email, senha);
        this.listaFuncionarios.push(funcionario);
        console.log(`Funcionario ${nome} cadastrado com sucesso!`); 
    }

    //Cadastro de cliente

    cadastrarCliente(nome, cpf, email, senha){
        const id = this.gerarId(1, this.listaClientes);
        const cliente = new Cliente(id, nome, cpf, email, senha);
        this.listaClientes.push(cliente);
        console.log(`Cliente ${nome} cadastrado com sucesso!`);
    }

    login(email, senha){
        const funcionario = this.listaFuncionarios.find(function (funcionario) {
            return funcionario.email == email && funcionario.senha == senha;        // Dara a relacao true ou false
        });
    
        const cliente = this.listaClientes.find(function (cliente) {
            return cliente.email == email && cliente.senha == senha;
        });
        
        if(funcionario){
            this.usuario = funcionario;
            this.usuario.tipoUsuario = "funcionario";           // Adicionada uma propriedade para identificar se é funcionario
            console.log(`Login realizado com sucesso! Bem-vindo ${usuario.nome} (funcionario)`);
        } else if(cliente){
            this.usuario = cliente;
            this.usuario.tipoUsuario = "cliente";
            console.log(`Login realizado com sucesso! Bem-vindo ${this.usuario.nome}`);
        } else {
            console.log("Email ou senha invalidos...");
        }
    }

    logout(){
        this.usuario = null;
        console.log("O usuario fez logout da página. Voltando para tela inicial");
    }
    
    //Metodos para funcionarios

    verDadosFuncionario(){
        if(this.usuario instanceof Funcionario)
        {
            this.limparTela();
            console.log("------------- Dados Usuario -------------");
            console.log(`Nome: ${this.usuario.nome}`);
            console.log(`ID: ${this.usuario.id}`);
            console.log(`CPF: ${this.usuario.cpf}`);
            console.log(`Email: ${this.usuario.email}`);
            console.log("-----------------------------------------");

        } else {
            console.log("Acesso restrito.");
        }
    }

    verListaReservas(){
        if(this.usuario instanceof Funcionario)
        {
            console.log("------------- Lista de Reservas -------------")
            for 
        }
    }
    
    
    
}



//No final fazer a tela interativa com o usuario e utilizar os metodos estabelecidos no Sistema