import uan from '@uni-helper/uni-network'

export function chatPostMsg(
  messages: {
    role: 'system' | 'user' | 'assistant'
    content: string
    status?: 'loading' | 'stop' | 'error'
  }[]
) {
  return uan({
    baseUrl: '/chat',
    url: '/v1/chat/completions',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer sk-QFQBEkKT64UnDLd3eAGJEubmI6pg0YA1QEivua1uazFNFoGI'
    },
    data: {
      model: 'moonshot-v1-8k',
      messages: [
        {
          role: 'system',
          content:
            '作为一个周易大师，你非常擅长于解卦和占筮。你需要回答用户关于周易卦象的提问，但是相关的话题要限定在这个范围内，并且不能出现一些敏感或者不文明的用语。整个回复需要控制在300个字以内。'
        },
        ...messages
      ],
      temperature: 0.7
    }
  })
}
