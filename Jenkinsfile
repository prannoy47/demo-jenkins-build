node {
    def app

    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("prannoy47/node-app")
    }

    stage('Test image') {      
        app.inside {
            input('Do you want to proceed?')
        }
    }

    stage('Push image') {
        docker.withRegistry('', 'dockerhub') {
            app.push("latest")
            } 
                echo "Trying to Push Docker Build to DockerHub"
    }
	
    stage('Remove Unused docker image') {      
        sh("docker image rm -f prannoy47/node-app")
    }

    stage('Apply Kubernetes files') {
        withKubeConfig([credentialsId: 'kubernetes-admin']) {
            sh 'kubectl apply -f /opt/bluedata/share/demo-k8s/nfsshare/nodeapp-deployment.yaml'
        }
    }

}
