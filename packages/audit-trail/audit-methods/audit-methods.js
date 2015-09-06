Template.AuditMethods.helpers({
    methodsSettings:  function() {
        var fields = [
            {
                key: 'methodName',
                label: 'methodName'
            },
            {
                key: 'methodArguments',
                label: 'methodArguments'
            },
            {
                key: 'time',
                label: 'time'
            },
            {
                key: 'by',
                label: 'by'
            },
            {
                key: 'endAt',
                label: 'endAt'
            }
        ];

        return {
            showColumnToggles: true,
            fields: fields
        };
    }
});