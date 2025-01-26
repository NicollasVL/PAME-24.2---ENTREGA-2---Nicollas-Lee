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
            console.log('');
            console.log(`Nome: ${this.usuario.nome}`);
            console.log(`ID: ${this.usuario.id}`);
            console.log(`CPF: ${this.usuario.cpf}`);
            console.log(`Email: ${this.usuario.email}`);
            console.log('');
            console.log("-----------------------------------------");
            
        } else {
            console.log("Acesso restrito.");
        }
    }

    verListaReservas(){
        if(this.usuario instanceof Funcionario)
        {
            this.limparTela();
            console.log("----------- Lista de Reservas -----------");
            for(let i = 0; i < this.listaReservas.length; i++){
                console.log('');
                console.log(`Reserva ${i+1}:`);
                console.log(`ID da reserva: ${this.listaReservas[i].id}`);
                console.log(`ID do cliente: ${this.listaReservas[i].id_cliente}`);
                console.log(`Status da reserva: ${this.listaReservas[i].status}`);
                console.log(`Data entrada: ${this.listaReservas[i].dataEntrada}`);
                console.log(`Data saida: ${this.listaReservas[i].dataSaida}`);
            }
            console.log("-----------------------------------------");
        } else {
            console.log("Acesso restrito.");
        }
    }

    verListaQuartos(){
        if(this.usuario instanceof Funcionario)
        {
            this.limparTela();
            console.log("----------- Lista de Quartos -----------");
            for(let i = 0; i < this.listaQuartos.length; i++){
                console.log('');
                console.log(`Quarto ${this.listaQuartos[i].numeroQuarto}:`);
                console.log(`Quantidade de camas: ${this.listaQuartos[i].quantasCamas}`);
                console.log(`Preco por noite: R$${this.listaQuartos[i].precoPorNoite}`);
                console.log(`Quantidade disponivel: ${this.listaQuartos[i].quantidadeDisponivel}`);
                console.log(`Descricao: \n${this.listaQuartos[i].descricao}`);
            }
            console.log("-----------------------------------------");
        } else {
            console.log("Acesso restrito.");
        }
    }

    verinfosCliente(infoCliente){
        if(this.usuario instanceof Funcionario)
        {
            this.limparTela();
            console.log(`----------- ${infoCliente.nome} -----------`);
            for(let i = 0; i < infoCliente.length; i++){
                console.log('');
                console.log(`ID do cliente: ${this.infoCliente.id}:`);
                console.log(`CPF: ${this.infoCliente.cpf}`);
                console.log(`email: ${this.infoCliente.email}`);
                console.log(`Data de nascimento: ${this.infoCliente.dataNascimento}`);
            }
                console.log("-----------------------------------------");
            } else {
                console.log("Acesso restrito.");
            }
    }

    verListaClientes(){
        if(this.usuario instanceof Funcionario)
        {
            this.limparTela();
            console.log(`---------- Lista de Clientes -----------------`);
            for(let i = 0; i < this.listaClientes.length; i++){
                console.log(`${i+1}. ${this.listaClientes[i].nome}`);
            }
            console.log('----------------------------------------------');
        } else {
            console.log("Acesso restrito.");
        }

    }

    mudarStatusReserva(reservaId, novoStatus){
        if(this.usuario instanceof Funcionarios)
        {
            const reserva = this.reservas.find(r => r.id === reservaId);
            if (reserva) {
                reserva.status = novoStatus;
                console.log("Status da reserva atualizado.");
            } else {
                console.log("Reserva não encontrada.");
            }

        } else {
            console.log("Acesso restrito.");
        }  
    }

    adicionarQuarto(nome, descricao, camas, precoPorNoite, quantidadeDisponivel) {
        if (this.usuarioAtual instanceof Funcionario) {
            const quarto = new Quartos(nome, descricao, camas, precoPorNoite, quantidadeDisponivel);
            this.listaQuartos.push(quarto);
            console.log("Quarto adicionado com sucesso!");
        } else {
            console.log("Acesso restrito.");
        }
    }



}





    

main()

//No final fazer a tela interativa com o usuario e utilizar os metodos estabelecidos no Sistema