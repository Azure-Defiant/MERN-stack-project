export default function loginUseCase(repo) {
    return (payload) => repo.login(payload);
  }