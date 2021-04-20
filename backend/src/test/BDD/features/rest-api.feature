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
            | 37747947969500 | 123456781 | 404    |


