export default function logoutUseCase(repo) {
    return () => repo.logout();
  }  