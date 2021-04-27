  
Feature: Testeando API-REST 

    In order manage directory
    As a developer
    I want to make sure REST API works fine

    Scenario Outline: Como usuario puedo o no ingresar al sistema?
        Given an user with account number: "<account>" and password: "<password>"
        When I send POST request to /login
        Then I get response code: "<status>"

        Examples:
            | account        | password  | status |
            | 37747947969500 | 123456789 | 202    |


    Scenario Outline: como usuario puedo o no consultar mi saldo?
        Given an user with account number: "<account>"
        When I send POST request to /consultarSaldo
        Then I get response code: "<status>"

        Examples:
            | account        | status |
            | 37747947969500 | 202    |


    Scenario Outline: como usuario puedo o no registrarme en el sistema?
        Given a new user with credentials: "<name>", "<lastname>", "<CUI>", "<balance>", "mail" and "password"
        When I send POST request to /nuevoUsuario
        Then I get response code: "<status>"

        Examples:
            | name   | lastname | CUI            | balance | mail             | password  | status |
            | prueba | exitosa  | 3441841771168  | 178000  | prueba@gmail.com | 123456789 | 202    |

    
    Scenario Outline: Como usuario puedo o no ver mi perfil?
        Given an user with account number: "<account>" and password: "<password>"
        When I send POST request to /login
        Then I get response code: "<status>"

        Examples:
            | account        | password  | status |
            | 37747947969500 | 123456789 | 202    |

        
    Scenario Outline: Como usuario puedo o no realizar una transaccion?
        Given an user with account number: "<account>" who wants to send <number> quetzales to another user with account number: "<account2>"
        When I send POST request to /nuevaTransaccion
        Then I get response code: "<status>"

        Examples:
            | account        | account2       | number | status |
            | 37747947969500 | 05522194828065 | 160    | 202    |
