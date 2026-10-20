import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

// --- TIPOS (Inclusos diretamente no arquivo) ---
type LatiMedida = 'kg' | 'g' | 'L' | 'ml' | 'unidade';

interface LatiItemProduto {
  idProduto: string;
  rotuloNome: string;
  valorUnitario: number;
  medidaMetrica: LatiMedida;
  urlImagem?: string;
}

type LatiRegraPromocional = 
  | 'Leve X Pague Y' 
  | 'Desconto por Volume' 
  | 'Cartão Exclusivo' 
  | 'Oferta do Dia';

interface LatiItemPromocao {
  idOferta: string;
  produtoAssociado: LatiItemProduto;
  modalidadeOferta: LatiRegraPromocional;
  valorOferta: number;
  descricaoRegra: string;
}

// --- DADOS MANUAIS (CATÁLOGO DE 10 PRODUTOS E 6 PROMOÇÕES) ---
const CATALOGO_LATICINIOS: LatiItemProduto[] = [
  { idProduto: 'LAT-001', rotuloNome: 'Leite Integral Tipo A', valorUnitario: 5.89, medidaMetrica: 'L', urlImagem: 'https://picsum.photos/200?random=1' },
  { idProduto: 'LAT-002', rotuloNome: 'Queijo Mussarela Fatiado', valorUnitario: 38.50, medidaMetrica: 'kg', urlImagem: 'https://picsum.photos/200?random=2' },
  { idProduto: 'LAT-003', rotuloNome: 'Manteiga com Sal 200g', valorUnitario: 11.20, medidaMetrica: 'unidade', urlImagem: 'https://picsum.photos/200?random=3' },
  { idProduto: 'LAT-004', rotuloNome: 'Requeijão Cremosissimo', valorUnitario: 8.49, medidaMetrica: 'unidade', urlImagem: 'https://picsum.photos/200?random=4' },
  { idProduto: 'LAT-005', rotuloNome: 'Iogurte Natural 170g', valorUnitario: 3.99, medidaMetrica: 'unidade', urlImagem: 'https://picsum.photos/200?random=5' },
  { idProduto: 'LAT-006', rotuloNome: 'Creme de Leite Fresco', valorUnitario: 14.30, medidaMetrica: 'ml', urlImagem: 'https://picsum.photos/200?random=6' },
  { idProduto: 'LAT-007', rotuloNome: 'Queijo Minas Frescal', valorUnitario: 29.90, medidaMetrica: 'kg', urlImagem: 'https://picsum.photos/200?random=7' },
  { idProduto: 'LAT-008', rotuloNome: 'Doce de Leite Artesanal', valorUnitario: 18.00, medidaMetrica: 'unidade', urlImagem: 'https://picsum.photos/200?random=8' },
  { idProduto: 'LAT-009', rotuloNome: 'Nata Tradicional 300g', valorUnitario: 9.75, medidaMetrica: 'unidade', urlImagem: 'https://picsum.photos/200?random=9' },
  { idProduto: 'LAT-010', rotuloNome: 'Queijo Parmesão Ralado', valorUnitario: 6.50, medidaMetrica: 'g', urlImagem: 'https://picsum.photos/200?random=10' },
];

const LISTA_PROMOCOES_VIGENTES: LatiItemPromocao[] = [
  {
    idOferta: 'PROM-101',
    produtoAssociado: CATALOGO_LATICINIOS[0],
    modalidadeOferta: 'Leve X Pague Y',
    valorOferta: 4.50,
    descricaoRegra: 'Leve 4 e Pague 3 unidades',
  },
  {
    idOferta: 'PROM-102',
    produtoAssociado: CATALOGO_LATICINIOS[1],
    modalidadeOferta: 'Desconto por Volume',
    valorOferta: 32.90,
    descricaoRegra: 'Acima de 2kg pague R$ 32,90/kg',
  },
  {
    idOferta: 'PROM-103',
    produtoAssociado: CATALOGO_LATICINIOS[2],
    modalidadeOferta: 'Cartão Exclusivo',
    valorOferta: 8.99,
    descricaoRegra: 'Pagando no Cartão da Loja LatiMax',
  },
  {
    idOferta: 'PROM-104',
    produtoAssociado: CATALOGO_LATICINIOS[3],
    modalidadeOferta: 'Leve X Pague Y',
    valorOferta: 6.99,
    descricaoRegra: 'Leve 3 Pague 2 pote de 200g',
  },
  {
    idOferta: 'PROM-105',
    produtoAssociado: CATALOGO_LATICINIOS[6],
    modalidadeOferta: 'Desconto por Volume',
    valorOferta: 24.50,
    descricaoRegra: 'Na compra de 2 peças completas',
  },
  {
    idOferta: 'PROM-106',
    produtoAssociado: CATALOGO_LATICINIOS[7],
    modalidadeOferta: 'Cartão Exclusivo',
    valorOferta: 13.90,
    descricaoRegra: 'Exclusivo no cartão LatiMax em até 1x',
  },
];

type PainelNavegacao = 'PAINEL_INICIAL' | 'VITRINE_PRODUTOS' | 'VITRINE_OFERTAS';

export default function App() {
  const [secaoAtual, setSecaoAtual] = useState<PainelNavegacao>('PAINEL_INICIAL');

  // --- TELA 1: MENU PRINCIPAL ---
  const PainelMenuPrincipal = () => (
    <View style={estilosLocais.conteudoCentrado}>
      <View style={estilosLocais.caixaHeaderMercado}>
        <Text style={estilosLocais.subtituloMercado}>DISTRIBUIDORA DE LATICÍNIOS</Text>
        <Text style={estilosLocais.tituloMercado}>LatiMax Express</Text>
        <Text style={estilosLocais.sloganMercado}>O melhor do leite direto na sua mesa</Text>
      </View>

      <View style={estilosLocais.grupoBotoesNavegacao}>
        <TouchableOpacity
          style={estilosLocais.botaoAcaoNavegar}
          activeOpacity={0.8}
          onPress={() => setSecaoAtual('VITRINE_PRODUTOS')}
        >
          <Text style={estilosLocais.textoBotaoNavegar}>📦 Ver Catálogo de Produtos</Text>
          <Text style={estilosLocais.legendaBotao}>10+ itens cadastrados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilosLocais.botaoAcaoNavegar, estilosLocais.botaoAcaoDestaque]}
          activeOpacity={0.8}
          onPress={() => setSecaoAtual('VITRINE_OFERTAS')}
        >
          <Text style={estilosLocais.textoBotaoNavegar}>🔥 Ofertas & Promoções</Text>
          <Text style={estilosLocais.legendaBotao}>6 promoções exclusivas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- TELA 2: LISTAGEM DE PRODUTOS ---
  const VisaoListagemProdutos = () => {
    const renderizadorItemProduto = ({ item }: { item: LatiItemProduto }) => (
      <View style={estilosLocais.cardPadraoProduto}>
        <View style={estilosLocais.blocoInfoItem}>
          <Text style={estilosLocais.codigoTag}>{item.idProduto}</Text>
          <Text style={estilosLocais.nomeItem}>{item.rotuloNome}</Text>
          <Text style={estilosLocais.unidadeTag}>
            Unidade de Medida: <Text style={estilosLocais.destaqueTexto}>{item.medidaMetrica}</Text>
          </Text>
        </View>
        <View style={estilosLocais.blocoPreco}>
          <Text style={estilosLocais.rotuloPreco}>Preço</Text>
          <Text style={estilosLocais.valorMeda}>
            R$ {item.valorUnitario.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>
    );

    return (
      <View style={estilosLocais.containerConteudoListas}>
        <Text style={estilosLocais.cabecalhoSecao}>Catálogo Geral de Produtos</Text>
        <FlatList
          data={CATALOGO_LATICINIOS}
          keyExtractor={(item) => item.idProduto}
          renderItem={renderizadorItemProduto}
          contentContainerStyle={estilosLocais.espacamentoLista}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  // --- TELA 3: LISTAGEM DE PROMOÇÕES ---
  const VisaoListagemPromocoes = () => {
    const renderizadorItemOferta = ({ item }: { item: LatiItemPromocao }) => (
      <View style={estilosLocais.cardPromocional}>
        <Image
          source={{ uri: item.produtoAssociado.urlImagem }}
          style={estilosLocais.miniaturaFotoProduto}
          resizeMode="cover"
        />
        <View style={estilosLocais.corpoInfoOferta}>
          <Text style={estilosLocais.badgeTipoPromocao}>{item.modalidadeOferta}</Text>
          <Text style={estilosLocais.nomeProdutoPromocao}>
            {item.produtoAssociado.rotuloNome}
          </Text>
          <Text style={estilosLocais.detalhesRegra}>{item.descricaoRegra}</Text>
          
          <View style={estilosLocais.linhaPrecoPromocao}>
            <Text style={estilosLocais.precoAntigoRiscado}>
              De: R$ {item.produtoAssociado.valorUnitario.toFixed(2).replace('.', ',')}
            </Text>
            <Text style={estilosLocais.precoPromocionalRealce}>
              Por: R$ {item.valorOferta.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      </View>
    );

    return (
      <View style={estilosLocais.containerConteudoListas}>
        <Text style={estilosLocais.cabecalhoSecao}>Mural de Promoções Ativas</Text>
        <FlatList
          data={LISTA_PROMOCOES_VIGENTES}
          keyExtractor={(item) => item.idOferta}
          renderItem={renderizadorItemOferta}
          contentContainerStyle={estilosLocais.espacamentoLista}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={estilosLocais.estruturaRoot}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />

      <View style={estilosLocais.areaExibicaoTela}>
        {secaoAtual === 'PAINEL_INICIAL' && <PainelMenuPrincipal />}
        {secaoAtual === 'VITRINE_PRODUTOS' && <VisaoListagemProdutos />}
        {secaoAtual === 'VITRINE_OFERTAS' && <VisaoListagemPromocoes />}
      </View>

      {secaoAtual !== 'PAINEL_INICIAL' && (
        <TouchableOpacity
          style={estilosLocais.botaoFlutuanteVoltar}
          onPress={() => setSecaoAtual('PAINEL_INICIAL')}
        >
          <Text style={estilosLocais.textoBotaoFlutuante}>← Voltar ao Menu LatiMax</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const estilosLocais = StyleSheet.create({
  estruturaRoot: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  areaExibicaoTela: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  conteudoCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caixaHeaderMercado: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtituloMercado: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0055A5',
    letterSpacing: 1.5,
  },
  tituloMercado: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 4,
  },
  sloganMercado: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
  },
  grupoBotoesNavegacao: {
    width: '100%',
    gap: 16,
  },
  botaoAcaoNavegar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  botaoAcaoDestaque: {
    backgroundColor: '#0055A5',
    borderColor: '#004488',
  },
  textoBotaoNavegar: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  legendaBotao: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  containerConteudoListas: {
    flex: 1,
  },
  cabecalhoSecao: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  espacamentoLista: {
    paddingBottom: 80,
    gap: 12,
  },
  cardPadraoProduto: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#0055A5',
  },
  blocoInfoItem: {
    flex: 1,
  },
  codigoTag: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginVertical: 2,
  },
  unidadeTag: {
    fontSize: 12,
    color: '#64748B',
  },
  destaqueTexto: {
    fontWeight: '700',
    color: '#0F172A',
  },
  blocoPreco: {
    alignItems: 'flex-end',
  },
  rotuloPreco: {
    fontSize: 10,
    color: '#94A3B8',
  },
  valorMeda: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16A34A',
  },
  cardPromocional: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  miniaturaFotoProduto: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  corpoInfoOferta: {
    flex: 1,
    marginLeft: 12,
  },
  badgeTipoPromocao: {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  nomeProdutoPromocao: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  detalhesRegra: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
  },
  linhaPrecoPromocao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  precoAntigoRiscado: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  precoPromocionalRealce: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
  botaoFlutuanteVoltar: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  textoBotaoFlutuante: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});