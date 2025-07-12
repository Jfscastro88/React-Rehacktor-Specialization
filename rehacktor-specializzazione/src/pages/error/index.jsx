import { useTranslation } from 'react-i18next';

function ErrorPage() {
    const { t } = useTranslation();
    return (
        <main className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!</h1>
        <p className="text-lg text-gray-600">{t('Something went wrong or the page doesn\'t exist')}.</p>
        <p className="mt-4">
        {t('Back to')}{" "}
        <a href="/" className="text-blue-600 underline hover:text-blue-800">
        {t('Homepage')}
        </a>
        .
        </p>
        </main>
    )
}
export default ErrorPage;