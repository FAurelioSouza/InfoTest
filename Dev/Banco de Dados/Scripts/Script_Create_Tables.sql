use master;
go
Create database Info_Invest
go
use Info_Invest;
go

Create table Tb_Perfil(
	Id_Perfil int identity(1,1) primary key,
	Ds_Perfil varchar(30) not null
)

Create table Tb_Grupo_Ativo(
	Id_Grupo int identity(1,1) primary key,
	Nm_Grupo varchar(50) not null
)

Create table Tb_Usuario(
	Id_Usuario int identity(1,1) primary key,
	Cl_Senha varchar(50) not null,
	Cl_Login varchar(100) not null,
	Dt_Nascimento Date not null,
	Nm_Usuario varchar(100) not null,
	Fk_Perfil_Id int not null,
	Foreign key (Fk_Perfil_Id) references Tb_Perfil (Id_Perfil)
)

Create table Tb_Carteira(
	Id_Carteira int identity(1,1) primary key,
	Fk_Usuario_Id int not null,
	Foreign key (Fk_Usuario_Id) references Tb_Usuario(Id_Usuario)
)

Create table Tb_Ativo(
	Id_Ativo int identity(1,1) primary key,
	Nm_Ativo varchar(100) not null,
	Fk_Grupo_Id int not null,
	Foreign key (Fk_Grupo_Id) references Tb_Grupo_Ativo (Id_Grupo)
)

Create table Tb_Transicao(
	Id_Transicao int identity(1,1) primary key,
	Nr_Valor float not null,
	Fk_Carteira_Id int not null,
	Fk_Ativo_Id int not null,
	Foreign key (Fk_Carteira_Id) references Tb_Carteira(Id_Carteira),
	Foreign key (Fk_Ativo_Id) references Tb_Ativo(Id_Ativo)
)

select * from Tb_Perfil
select * from Tb_Usuario
select * from Tb_Carteira

select * from Tb_Grupo_Ativo
select * from Tb_Ativo
select * from Tb_Transicao



