use Info_Invest;

Insert into Tb_Perfil(Ds_Perfil)values('Admin');
Insert into Tb_Perfil(Ds_Perfil)values('Gerente');
Insert into Tb_Perfil(Ds_Perfil)values('Cliente');

Insert into Tb_Usuario values('admin123', 'admin', '17/03/1999', 'Felipe Aur�lio', 1)

Insert into Tb_Grupo_Ativo(Nm_Grupo)values('Renda Fixa');
Insert into Tb_Grupo_Ativo(Nm_Grupo)values('Renda Vari�vel');
Insert into Tb_Grupo_Ativo(Nm_Grupo)values('Fundos');
Insert into Tb_Grupo_Ativo(Nm_Grupo)values('A��es');
Insert into Tb_Grupo_Ativo(Nm_Grupo)values('Tesouro Direto');
Insert into Tb_Grupo_Ativo(Nm_Grupo)values('Poupan�a');
Insert into Tb_Grupo_Ativo(Nm_Grupo)values('Criptomoeda');

select * from Tb_Usuario
select * from Tb_Perfil
select * from Tb_Grupo_Ativo