export default function getMeUseCase(repo) {
    return () => repo.getMe();
  }  