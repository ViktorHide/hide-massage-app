import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// Главная страница с проверкой баланса
function Home() {
    const [clientCode, setClientCode] = useState('');
    const [balance, setBalance] = useState(null);
    const [showBalance, setShowBalance] = useState(false);
    const navigate = useNavigate();

    const clients = JSON.parse(localStorage.getItem('clients')) || [];

    const handleCheckBalance = () => {
        const client = clients.find(c => c.id === clientCode);
        if (client) {
            setBalance(`${client.balance} THB`);
            setShowBalance(true);
        } else {
            setBalance("Клиент не найден");
            setShowBalance(true);
        }
    };

    const handleEmployeeLogin = () => {
        navigate('/employee-login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
            <div className="bg-white w-full max-w-md p-6 text-center shadow-2xl rounded-xl">
                <h1 className="text-3xl font-bold mb-4">Добро пожаловать!</h1>
                <p className="text-lg mb-4">Акция месяца: купи 5 сеансов и получи 1 бесплатно!</p>
                <input
                    value={clientCode}
                    onChange={(e) => setClientCode(e.target.value)}
                    placeholder="Введите ваш код"
                    className="mb-4 w-full border rounded-md p-2"
                />
                <button
                    onClick={handleCheckBalance}
                    className="bg-green-500 text-white px-4 py-2 rounded-md w-full mb-4"
                >
                    Проверить баланс
                </button>
                {showBalance && (
                    <div className="text-xl font-bold text-green-600">
                        Ваш баланс: {balance}
                    </div>
                )}
                <hr className="my-6" />
                <button
                    onClick={handleEmployeeLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                >
                    Для сотрудников
                </button>
            </div>
        </div>
    );
}

// Панель управления для сотрудников
function EmployeeDashboard() {
    const [clients, setClients] = useState(JSON.parse(localStorage.getItem('clients')) || []);
    const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || []);
    const [newClient, setNewClient] = useState({ id: '', name: '', balance: '' });
    const [amounts, setAmounts] = useState({});
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({ id: '', name: '', balance: '' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [clients, transactions]);

    const handleAddClient = () => {
        if (newClient.id && newClient.name && newClient.balance) {
            const updatedClients = [...clients, { ...newClient, transactions: [] }];
            setClients(updatedClients);
            setNewClient({ id: '', name: '', balance: '' });
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    const handleBalanceUpdate = (id) => {
        const { addAmount = 0, deductAmount = 0 } = amounts[id] || {};
        const updatedClients = clients.map(client =>
            client.id === id
                ? {
                      ...client,
                      balance: client.balance + Number(addAmount) - Number(deductAmount),
                      transactions: [...(client.transactions || []), `+${addAmount} / -${deductAmount}`],
                  }
                : client
        );
        setClients(updatedClients);
        setTransactions([...transactions, { id, addAmount, deductAmount, date: new Date().toLocaleString() }]);
        setAmounts({ ...amounts, [id]: { addAmount: '', deductAmount: '' } });
    };

    const handleDeleteClient = (id) => {
        const updatedClients = clients.filter(client => client.id !== id);
        setClients(updatedClients);
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
            <div className="bg-white w-full max-w-md p-6 text-center shadow-2xl rounded-xl">
                <h1 className="text-3xl font-bold mb-4">Панель сотрудников</h1>

                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск по имени или ID"
                    className="mb-4 w-full border rounded-md p-2"
                />

                {/* Добавление нового клиента */}
                <div className="mb-4">
                    <input
                        value={newClient.id}
                        onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
                        placeholder="ID клиента"
                        className="mb-2 w-full border rounded-md p-2"
                    />
                    <input
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        placeholder="Имя клиента"
                        className="mb-2 w-full border rounded-md p-2"
                    />
                    <input
                        value={newClient.balance}
                        onChange={(e) => setNewClient({ ...newClient, balance: Number(e.target.value) })}
                        placeholder="Баланс"
                        className="mb-2 w-full border rounded-md p-2"
                    />
                    <button
                        onClick={handleAddClient}
                        className="bg-green-500 text-white px-4 py-2 rounded-md w-full mb-4"
                    >
                        Добавить клиента
                    </button>
                </div>

                {/* Список клиентов */}
                <ul className="w-full text-left">
                    {filteredClients.map(client => (
                        <li key={client.id} className="p-2 border-b border-gray-200">
                            {client.name} (ID: {client.id}) — {client.balance} THB
                            <input
                                type="number"
                                placeholder="- Списать"
                                value={amounts[client.id]?.deductAmount || ''}
                                onChange={(e) => setAmounts({ ...amounts, [client.id]: { ...amounts[client.id], deductAmount: e.target.value } })}
                            />
                            <input
                                type="number"
                                placeholder="+ Пополнить"
                                value={amounts[client.id]?.addAmount || ''}
                                onChange={(e) => setAmounts({ ...amounts, [client.id]: { ...amounts[client.id], addAmount: e.target.value } })}
                            />
                            <button
                                onClick={() => handleBalanceUpdate(client.id)}
                                className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md"
                            >
                                Done
                            </button>
                            <button onClick={() => handleDeleteClient(client.id)} className="ml-4 bg-red-500 text-white px-2 py-1 rounded-md">Delete Customer</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Основной роутинг приложения
export default function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee-login" element={<EmployeeDashboard />} />
            </Routes>
        </Router>
    );
}
