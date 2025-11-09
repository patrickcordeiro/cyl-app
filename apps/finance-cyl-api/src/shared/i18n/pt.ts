export default {
  lib: {
    errors: {
      entityNotFound:
        '{{entityName}} não encontrado(a) ({{identityType}}: {{identityNumber}})',
      unsupportedMediaType:
        "O tipo '{{mediaType}}' é inválido para essa requisição",
      validation: 'Campos não são válidos: [{{fields}}]',
      invalidToken: 'Token inválido',
      internalServerError: 'Erro interno no servidor',
      invalidCredentials: 'Credenciais inválidas',
      invalidRefreshToken: 'Token de renovação inválido',
      noAuthorizationHeader: 'Cabeçalho de autorização não identificado',
    },
  },
};
