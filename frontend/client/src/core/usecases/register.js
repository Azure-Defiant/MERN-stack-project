export default function registerUseCase(repo) {
    return (payload) => repo.register(payload);
  }