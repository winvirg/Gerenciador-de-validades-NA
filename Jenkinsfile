pipeline {
    agent any

    environment {
        APP_NAME = "Gerenciador-Backend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh '''
                        npm ci
                    '''
                }
            }
        }

        stage('Application Validation') {
            steps {
                dir('backend') {
                    sh '''
                        node --check server.js
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('backend') {
                    sh '''
                        if pm2 describe $APP_NAME > /dev/null 2>&1; then
                            echo "Aplicação já existe. Reiniciando..."
                            pm2 restart $APP_NAME
                        else
                            echo "Aplicação não encontrada. Iniciando..."
                            pm2 start server.js --name $APP_NAME
                        fi

                        pm2 save
                    '''
                }
            }
        }
    }   // <- faltava esta chave

    post {
        success {
            echo 'Deploy concluído com sucesso.'
        }

        failure {
            echo 'Falha no pipeline.'
        }
    }
}