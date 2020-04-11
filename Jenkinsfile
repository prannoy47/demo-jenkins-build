node {
    def app

    stage('Clone repository') {
        checkout scm
    }
    stage('Initialize Docker') {
        def dockerHome = tool 'docker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
	sh("sudo service docker start && /bin/bash")
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
}
