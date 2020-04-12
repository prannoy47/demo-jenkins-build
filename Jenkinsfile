node {
    def app

    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("prannoy47/nodeapp")
    }

    stage('Test image') {      
        app.inside {
            input('Do you want to proceed?')
        }
    }

    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
            } 
                echo "Trying to Push Docker Build to DockerHub"
    }
	
    stage('Remove Unused docker image') {      
        sh("docker rmi -f prannoy47/nodeapp")
    }

    stage('Apply Kubernetes files') {
	withKubeConfig([credentialsId: 'kubernetes-admin', serverUrl: 'https://ec2-52-20-82-207.compute-1.amazonaws.com:10000']) {
	   sh 'kubectl apply -f /opt/bluedata/share/demo-k8s/nsfshare/nodeapp-deployment.yaml'
    }


}
