import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function CheckoutIndex({ event, categories }) {
    const { data, setData, post, processing } = useForm({
        ticket_category_id: categories.length > 0 ? categories[0].ID : '',
        qty: 1,
    });

    const selectedCategory = categories.find(c => c.ID == data.ticket_category_id);
    const price = selectedCategory ? selectedCategory.Price : 0;
    const total = price * data.qty;

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.store', event.id));
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-10 font-sans">
            <Head title={`Checkout - ${event.title}`} />
            <div className="max-w-2xl mx-auto bg-[#111] border border-white/5 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Checkout Ticket</h1>
                <p className="text-gray-500 mb-8 text-sm">Selesaikan pesanan Anda untuk mendapatkan e-ticket.</p>
                
                <form onSubmit={submit} className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-xl font-bold text-[#e8ff47] mb-6">{event.title}</h2>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kategori Tiket</label>
                                <select 
                                    value={data.ticket_category_id}
                                    onChange={e => setData('ticket_category_id', e.target.value)}
                                    className="bg-[#050505] border border-white/10 rounded-lg p-3 text-sm focus:border-[#e8ff47] outline-none"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.ID} value={cat.ID}>
                                            {cat.CategoryName} - Rp {Number(cat.Price).toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Jumlah</label>
                                <input 
                                    type="number" 
                                    value={data.qty}
                                    min="1"
                                    onChange={e => setData('qty', e.target.value)}
                                    className="w-20 bg-[#050505] border border-white/10 rounded-lg p-2 text-center text-[#e8ff47] font-black"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-[#e8ff47]/5 rounded-xl border border-[#e8ff47]/10">
                        <span className="text-sm font-bold uppercase text-gray-400">Total Pembayaran</span>
                        <span className="text-2xl font-black text-[#e8ff47]">Rp {total.toLocaleString()}</span>
                    </div>

                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#e8ff47] text-black font-black py-4 rounded-xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(232,255,71,0.2)]"
                    >
                        {processing ? 'Processing...' : 'Confirm Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}