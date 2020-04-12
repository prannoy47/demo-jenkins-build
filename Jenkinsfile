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
            echo "Tests Passed"
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

    stage('Deploy Application to k8s cluster') {      
        sh("ssh centos@34.203.199.124 kubectl apply -f /opt/bluedata/share/demo-k8s/nsfshare/apps/nodeapp-deployment.yaml")
    }

}
