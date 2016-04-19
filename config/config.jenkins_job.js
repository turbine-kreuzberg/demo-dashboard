
module.exports = {

    protocol: 'http',
    username: 'matthias.gronwald',
    token: 'bbe3da0353192bf4fa5822dd86990c7b',
    host: '192.168.1.230:8080',

    jobs: [
        {
            id: 'BIO_provision_basebox',
            displayName: 'Basebox',
            eventName: 'build_provision',
            cronInterval: '*/5 * * * * *',
            apiMethod: 'last_build_info',

            displayArguments: {
                title_isEnabled: true,
                buildNumber_isEnabled: true,
                timeAgo_isEnabled: true,
                branch_isEnabled: false,
                displayDuration_isEnabled: true
            }
        },
        {
            id: 'BIO_ci',
            displayName: 'Build',
            eventName: 'build_ci',
            cronInterval: '*/5 * * * * *',
            apiMethod: 'last_build_info',

            displayArguments: {
                title_isEnabled: true,
                buildNumber_isEnabled: true,
                timeAgo_isEnabled: true,
                branch_isEnabled: true,
                displayDuration_isEnabled: true
            }
        }
    ]
}
