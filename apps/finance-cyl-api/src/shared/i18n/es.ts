export default {
  lib: {
    errors: {
      entityNotFound:
        '{{entityName}} no encontrado(a) ({{identityType}}: {{identityNumber}})',
      unsupportedMediaType:
        'El tipo {{mediaType}} no es válido para esta solicitud',
      validation: 'Los campos no son válidos: [{{fields}}]',
      invalidToken: 'Token Inválido',
      internalServerError: 'Error Interno del Servidor',
      invalidCredentials: 'Credenciales Inválidas',
      invalidRefreshToken: 'Token de actualización inválido',
      noAuthorizationHeader: 'Sin encabezado de autorización',
    },
  },
};
