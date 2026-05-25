'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializando o Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ValidacaoPage() {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [valor, setValor] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [fotoUrl, setFotoUrl] = useState(''); // Armazena a URL após o upload

  // Etapa 1: Captura a foto e faz o upload imediato para o Storage
  const handleCapturaEUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMensagem('📸 Enviando comprovante para a nuvem...');

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('comprovantes_nf')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('comprovantes_nf')
        .getPublicUrl(fileName);
      
      // Avança para a Etapa 2 liberando os campos
      setFotoUrl(publicUrlData.publicUrl);
      setMensagem('✅ Imagem capturada com sucesso! Insira os dados abaixo.');

    } catch (error: any) {
      setMensagem(`❌ Erro no upload: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Etapa 2: Salva os dados finais do formulário junto com a URL da foto no banco
  const handleSalvarDadosFinais = async () => {
    if (!fotoUrl) {
      setMensagem('❌ Erro: Nenhuma foto capturada.');
      return;
    }

    setLoading(true);
    setMensagem('💾 Gravando dados da nota no sistema...');

    try {
      const { error: dbError } = await supabase
        .from('notas_fiscais')
        .insert([
          { 
            valor_total: valor || '0', 
            fornecedor: fornecedor || 'Não informado',
            foto_url: fotoUrl,
            data_emissao: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      setMensagem('🚀 Sucesso! Nota fiscal arquivada e registrada.');
      
      // Reseta o fluxo para a próxima nota
      setValor('');
      setFornecedor('');
      setFotoUrl('');

    } catch (error: any) {
      setMensagem(`❌ Erro ao salvar dados: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6 font-sans">
      <div className="max-w-md mx-auto space-y-8 mt-10">
        
        <div>
          <h1 className="text-2xl font-light tracking-widest text-white mb-2">VALIDAÇÃO</h1>
          <p className="text-sm text-gray-500">Fluxo direto de captura de despesas.</p>
        </div>

        {mensagem && (
          <div className="p-4 rounded-md bg-gray-900 border border-gray-800 text-sm transition-all text-center">
            {mensagem}
          </div>
        )}

        {/* ETAPA 1: Se ainda não tirou a foto, mostra apenas o botão da câmera */}
        {!fotoUrl ? (
          <div className="flex flex-col items-center justify-center pt-10 space-y-6">
            <div className="w-24 h-24 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-3xl">
              📸
            </div>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Toque no botão abaixo para abrir a câmera e fotografar o recibo.
            </p>
            
            <label 
              className={`flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 rounded-lg transition-all cursor-pointer select-none active:scale-95 text-center ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {loading ? 'Processando imagem...' : 'Abrir Câmera do Set'}
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                onChange={handleCapturaEUpload}
                className="absolute opacity-0 w-[0.1px] h-[0.1px] overflow-hidden -z-10"
                disabled={loading}
              />
            </label>
          </div>
        ) : (
          /* ETAPA 2: Foto capturada, revela os campos para o preenchimento */
          <div className="space-y-6 animate-fade-in">
            {/* Mini preview para o usuário saber que a foto está lá */}
            <div className="w-full h-32 bg-gray-950 border border-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={fotoUrl} alt="Preview" className="w-full h-full object-contain opacity-70" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-500 mb-2">FORNECEDOR</label>
                <input 
                  type="text" 
                  value={fornecedor}
                  onChange={(e) => setFornecedor(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Ex: Aluguel de Equipamento"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-500 mb-2">VALOR TOTAL</label>
                <input 
                  type="number" 
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>

            <button 
              onClick={handleSalvarDadosFinais}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Confirmar e Arquivar Nota'}
            </button>

            <button 
              onClick={() => setFotoUrl('')}
              disabled={loading}
              className="w-full bg-transparent hover:bg-gray-950 text-gray-500 font-medium py-2 rounded-lg text-xs transition-all"
            >
              Tirar outra foto
            </button>
          </div>
        )}

      </div>
    </div>
  );
}