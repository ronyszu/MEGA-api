import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

 //ENDPOINT GET que recebe endereco EVM e devolve todas as NFTs associadas a ele
export async function GET(request: Request) {
  try {
    // Extrair o parâmetro 'owner_of' da query string
    const { searchParams } = new URL(request.url);
    const ownerOf = searchParams.get('owner_of');  // Pega o valor de 'owner_of'

    // Se o parâmetro 'owner_of' for passado, filtra os resultados
    let nfts;
    if (ownerOf) {
      nfts = await prisma.nftsMega.findMany({
        where: {
          owner_of: ownerOf,  // Filtro pelo campo 'owner_of'
        },
      });

      
      if (nfts.length === 0){
       // Se o parâmetro 'owner_of' nao possuir nenhuma NFT no banco, retorne erro
        return NextResponse.json({ error: 'Endereço nao tem NFTs ou está incorreto' }, { status: 500 });
      }

    } else {

      // Se o parâmetro 'owner_of' não for passado  retorne erro
      return NextResponse.json({ error: 'Endereço nao tem NFTs ou está incorreto' }, { status: 500 });
    }

    return NextResponse.json(nfts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

}

//ENDPOINT POST que recebe end EVM e end SOL, faz a query pra pegar a NFT do endereco EVM baseado  no Owner_of e atualiza com o endereco solana
export async function POST(request: Request) {
  try {
    // Lê o corpo da requisição para obter 'solana_address' e 'owner_of'
    const body = await request.json();
    const { solana_address, owner_of } = body;

    // Verifica se ambos os parâmetros foram enviados
    if (!solana_address || !owner_of) {
      return NextResponse.json({ error: 'Missing solana_address or owner_of' }, { status: 400 });
    }

    // Atualiza a tabela nftsMega com o novo solana_address para o owner_of correspondente
    const updateResult = await prisma.nftsMega.updateMany({
      where: {
        owner_of: owner_of,  // Filtra pelo campo 'owner_of'
      },
      data: {
        solana_address: solana_address,  // Atualiza o campo 'solana_address'
      },
    });

    // Verifica se algum registro foi atualizado
    if (updateResult.count === 0) {
      return NextResponse.json({ message: 'No records found for this owner_of' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Solana address updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating Solana address:', error);
    return NextResponse.json({ error: 'Failed to update Solana address' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}