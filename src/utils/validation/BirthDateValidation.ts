export const birthDateValidation = (data: Date | null): string | null => {
    if (!data) return "Data de nascimento é obrigatória.";

    const hoje = new Date();
    const idade = hoje.getFullYear() - data.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = data.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = data.getDate();

    const jaFezAniversarioEsteAno =
        mesAtual > mesNascimento ||
        (mesAtual === mesNascimento && diaAtual >= diaNascimento);

    const idadeReal = jaFezAniversarioEsteAno ? idade : idade - 1;

    if (idadeReal < 18) {
        return "Você deve ter pelo menos 18 anos.";
    }

    return null;
};