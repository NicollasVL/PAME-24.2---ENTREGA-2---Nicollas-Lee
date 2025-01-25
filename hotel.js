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
    
    
    cadastrarFuncionario(nomeFuncionario, dataNascimento, cpf, email, senha){
        const id = this.gerarId(0, this.listaFuncionarios);
        const funcionario = new Funcionario(id, nomeFuncionario, dataNascimento, cpf, email, senha);
        this.listaFuncionarios.push(funcionario);
        console.log(`Funcionario ${nomeFuncionario} cadastrado com sucesso!`); 
    }

    //Cadastro de cliente

    cadastrarCliente(nomeCliente, cpf, email, senha){
        const id = this.gerarId(1, this.listaClientes);
        const cliente = new Cliente(id, nomeCliente, cpf, email, senha);
        this.listaClientes.push(cliente);
        console.log(`Cliente ${nomeCliente} cadastrado com sucesso!`);
    }

    login(email, senha){
        const usuario = this.listaFuncionarios.find(funcionario){
            return funcionario.email 
        }
    }




}


//No final fazer a tela interativa com o usuario e utilizar os metodos estabelecidos no Sistema