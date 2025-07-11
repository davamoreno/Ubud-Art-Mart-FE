export const useLoadingState = () => {
  const isLoading = useState('isLoading', () => false);
  return { isLoading };
}