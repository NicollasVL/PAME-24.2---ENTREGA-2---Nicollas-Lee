const prompt  = require('prompt-sync')();           //Biblioteca para o input (interacao com o usuario)

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
    
    
    cadastrarFuncionario(nome, cpf, email, senha){
        const id = this.gerarId(0, this.listaFuncionarios);
        const funcionario = new Funcionario(id, nome, cpf, email, senha);
        this.listaFuncionarios.push(funcionario);
        console.log(`Funcionario ${nome} cadastrado com sucesso!`); 
    }

    //Cadastro de cliente

    cadastrarCliente(nome, dataNascimento, cpf, email, senha){
        const id = this.gerarId(1, this.listaClientes);
        const cliente = new Cliente(id, nome, dataNascimento, cpf, email, senha);
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
            console.clear();
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
            console.clear();
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

        console.clear();
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

    }

    verinfosCliente(infoCliente){
        if(this.usuario instanceof Funcionario)
        {
            console.clear();
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
            console.clear();
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
            const reserva = this.listaReservas.find(function (q) {
                return q.id == reservaId;
            });
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

    removerQuarto(numerodoQuarto){
        let encontrado = false;

        for (let i = 0; i < this.listaQuartos.length; i++) {
            if (this.listaQuartos[i].numeroQuarto == numerodoQuarto) {
                this.listaQuartos.splice(i, 1); // Remove o quarto pelo índice
                encontrado = true;
                console.log(`Quarto ${numerodoQuarto} removido com sucesso.`);
                break; // Interrompe o loop após remover o quarto
            }
        }
    
        if (!encontrado) {
            console.log(`Quarto ${numerodoQuarto} não encontrado.`);
        }
    }
    

    editarQuarto(numerodoQuarto){
        const quarto = this.listaQuartos.find(function (q) {
            return q.numeroQuarto == numerodoQuarto;
        });

        if(quarto)
        {
            console.log(`--- Editar Quarto ${numerodoQuarto} ---`);
            console.log("1. Numero do quarto: " + quarto.numeroQuarto);
            console.log("2. Descrição: " + quarto.descricao);
            console.log("3. Quantas Camas: " + quarto.quantasCamas);
            console.log("4. Preço por Noite: " + quarto.precoPorNoite);
            console.log("5. Quantidade Disponível: " + quarto.quantidadeDisponivel);
            console.log("0. Cancelar");
            console.log("");
        
            const opcao = prompt("Escolha um numero da informacao que deseja editar: ");

            switch(opcao)
            {
                case "1":
                    const novoNumero = prompt("Novo numero do quarto: ");
                    quarto.numeroQuarto = novoNumero;
                    console.log("Novo numero adicionado!");
                    break;

                case "2":
                    const novaDescricao = prompt("Nova descricao: ");
                    quarto.descricao = novaDescricao;
                    console.log("Nova descricao adicionada!");
                    break;

                case "3":
                    const novasCamas = prompt("Quantas camas: ");
                    quarto.quantasCamas = Number(novasCamas);
                    console.log("Numero de camas atualizado!");
                    break;

                case "4":
                    const novoPreco = prompt("Novo preco por noite: ");
                    quarto.precoPorNoite = Number(novoPreco);
                    console.log("Preco por noite atualizado!");
                    break;

                case "5":
                    const novaQuantidadeDisponivel = prompt("Nova quantidade disponivel: ");
                    quarto.quantidadeDisponivel = novaQuantidadeDisponivel;
                    console.log("Quantidade de quartos atualizada! ");
                    break;

                case "0":
                    console.log("Edicao cancelada ");
                    break;
                
                default:
                    console.log("Opcao invalida");
                    break;
                
            } 

        } else {
            console.log(`Quarto ${numerodoQuarto} nao encontrado.`);

        }

    }

    //Metodos dos clientes 

    verDadosCliente(){
        
        console.clear();
        console.log("------------- Dados Usuario -------------");
        console.log('');
        console.log(`Nome: ${this.usuario.nome}`);
        console.log(`ID: ${this.usuario.id}`);
        console.log(`CPF: ${this.usuario.cpf}`);
        console.log(`Data de nascimento: ${this.usuario.dataNascimento}`);
        console.log(`Email: ${this.usuario.email}`);
        console.log('');
        console.log("-----------------------------------------");
             
    }

    fazerReserva(clienteId, dataEntrada, dataSaida) {
        const id = this.listaReservas.length + 1;
        const reserva = new Reserva(id, clienteId, "pendente", dataEntrada, dataSaida);
        this.listaReservas.push(reserva);
        console.log("Reserva criada com sucesso!");
        
    }
    
    cancelarReserva(reservaId) {
        const reserva = this.listaReservas.find(function (q) {
            return q.id == reservaId;
        });
        if (reserva) {
            reserva.status = "cancelada";
            console.log("Reserva cancelada com sucesso!");
        } else {
        console.log("Reserva não encontrada ou acesso negado.");
        }
    }    
    
    verMinhasReservas(clienteId){
        if (this.usuario instanceof Cliente && this.usuario.id == clienteId) {
            const minhasReservas = this.listaReservas.filter(function(r) {
                return r.id_cliente == clienteId;

            });
            
            console.clear();
            console.log('---------- Minhas Reservas ----------');

            if(minhasReservas.length === 0)
            {
                console.log("Voce nao possui reservas!");
            } else {
                for(let i = 0; i < minhasReservas.length; i++){
                    const reserva = minhasReservas[i];
                    console.log(`Reserva ${i + 1}:`);
                    console.log(`ID da Reserva: ${reserva.id}`);
                    console.log(`Status: ${reserva.status}`);
                    console.log(`Data de Entrada: ${reserva.dataEntrada}`);
                    console.log(`Data de Saída: ${reserva.dataSaida}`);
                    console.log('-------------------------------------');

                }
            }            
        } else {
            console.log("Acesso negado.");
        }
    }        

}

// Funcoes para o main

function telaFazerLogin(){
    console.clear();
    console.log("--------- Login --------");
    const email = prompt("Email: ");
    const senha = prompt ("Senha: ");

    sistema.login(email, senha);

    if(sistema.usuario){
    if (sistema.usuario.tipoUsuario === "funcionario")
    {
        menuFuncionario(sistema);
    } else if(sistema.usuario.tipoUsuario === "cliente") 
    {
        menuCliente(sistema);
    } else {
        prompt("Pressione Enter para voltar ao menu")
    }
    }
}

function telaFazerCadastro(){
    console.clear();
    console.log("-------- Cadastro --------");
    console.log("1. Cadastro de funcionario");
    console.log("2. Cadastro de cliente");
    console.log("3. Voltar");

    const opcao = prompt("Escolha uma opcao: ");

    switch(opcao){                                          // Ver se da para verificar a data de nascimento
        case "1":
            const nomeFuncionario = prompt("Nome: ");
            const cpfFuncionario = prompt("CPF: ");
            const emailFuncionario = prompt("Email: ");
            const senhaFuncionario = prompt("Senha: ");
            sistema.cadastrarFuncionario(nomeFuncionario, cpfFuncionario, emailFuncionario, senhaFuncionario);
            break;

        case "2":
            const nomeCliente = prompt("Nome: ");
            const cpfCliente = prompt("CPF: ");
            const dataNascimento = prompt("Data de nascimento (DD/MM/AAAA): ")
            const emailCliente = prompt("Email: ");
            const senhaCliente = prompt("Senha: ");
            sistema.cadastrarFuncionario(nomeCliente, dataNascimento, cpfCliente, emailCliente, senhaCliente);
            break;
        
        case "3":
            return;
        
        default:
            console.log("Opcao invalida. Tente novamente!");
    }
    prompt("Pressione Enter para continuar...");
}

function menuFuncionario(sistema){
    while (true){
        console.clear();
        console.log("--- Menu Funcionário ---");
        console.log("1. Ver Meus Dados");
        console.log("2. Ver Lista de Reservas");
        console.log("3. Ver Lista de Quartos");
        console.log("4. Ver Lista de Clientes");
        console.log("5. Mudar Status da Reserva");
        console.log("6. Adicionar Quarto");
        console.log("7. Logout");

        const opcao = prompt("Escolha uma opcao: ");

        switch(opcao){
            case "1":
                sistema.verDadosFuncionario();
                break;
            case "2":
                sistema.verListaReservas();
                break;
            case "3":
                sistema.verListaQuartos();
                break;
            case "4":
                sistema.verListaClientes();
                break;
            case "5":
                const reservaId = prompt("Digite o ID da reserva: ");
                const novoStatus = prompt("Digite o novo status (pendente, adiada, realizada, cancelada): ");
                sistema.mudarStatusReserva(Number(reservaId), novoStatus);
                break;
            case "6":
                const nomeQuarto = prompt("Nome do quarto: ");
                const descricao = prompt("Descrição: ");
                const camas = prompt("Quantidade de camas: ");
                const preco = prompt("Preço por noite: ");
                const disponivel = prompt("Quantidade disponível: ");
                sistema.adicionarQuarto(nomeQuarto, descricao, Number(camas), Number(preco), Number(disponivel));
                break;
            case "7":
                sistema.logout();
                return;
            default:
                console.log("Opcao invalida. Tente novamente");
            

        }
        prompt("Pressione Enter para continuar...");
    }

}



function menuCliente(sistema){
    while (true) {
        console.clear();
        console.log("--- Menu Cliente ---");
        console.log("1. Ver Meus Dados");
        console.log("2. Ver Lista de Quartos");
        console.log("3. Fazer Reserva");
        console.log("4. Cancelar Reserva");
        console.log("5. Ver Minhas Reservas");
        console.log("6. Logout");

        const opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                sistema.verDadosCliente();
                break;
            case "2":
                sistema.verListaQuartos();
                break;
            case "3":
                const clienteId = sistema.usuario.id;
                const dataEntrada = prompt("Digite a data de entrada (DD/MM/AAAA): ");
                const dataSaida = prompt("Digite a data de saída (DD/MM/AAAA): ");
                sistema.fazerReserva(clienteId, dataEntrada, dataSaida);
                break;
            case "4":
                const reservaId = prompt("Digite o ID da reserva que deseja cancelar: ");
                sistema.cancelarReserva(Number(reservaId));
                break;
            case "5":
                sistema.verMinhasReservas(sistema.usuario.id);
                break;
            case "6":
                sistema.logout();
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
        prompt("Pressione Enter para continuar...");
    }



}



function main(){
    const sistema = new Sistema();
    while (true){
        console.clear();
        console.log("----------- Bem-vindo ao Hotel F-luxo -----------");
        console.log("1. Fazer Login");
        console.log("2. Fazer Cadastro");
        console.log("3. Sair do Programa");

        const opcao = prompt("Escolha uma opcao: ")

        switch(opcao){
            case "1":
                telaFazerLogin(sistema);
                break;

            case "2":
                telaFazerCadastro(sistema);
                break;

            case "3":
                console.log("Encerrando sistema...");
                return;
            default:
                console.log("Opcao Invalida. Escolha uma opcao de 1 a 3");

        }
    }
}


main();

//No final fazer a tela interativa com o usuario e utilizar os metodos estabelecidos no Sistema