pipeline {
   environment {
        registry = "prannoy47/demo-build"
        registryCredential = 'dockerhub'
   }
   agent any

   stages {
      stage('Cloning Git') {
         steps {
            git 'https://github.com/prannoy47/demo-jenkins-build.git'
         }
      }
      stage('Building Image') {
         steps {
            script {
                docker.build registry + ":$BUILD_NUMBER"
            }
         }
      }
      stage('Test Image') {
         steps {
            input('Do you want to proceed?')
         }
      }
      stage('Push Docker Image') {
         steps {
            script {
                docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
                    dockerImage.push("new")
                }
            }
         }
      }
      stage('Remove Unused docker image') {
         steps {
            sh "docker rmi $registry:$BUILD_NUMBER"\
        }
      }
      stage('Apply Kubernetes files') {
        withKubeConfig([credentialsId: 'kubernetes-admin']) {
            sh "kubectl apply -f /opt/bluedata/share/demo-k8s/nsfshare/nodeapp-deployment.yaml"
        }
    }
   }
}
