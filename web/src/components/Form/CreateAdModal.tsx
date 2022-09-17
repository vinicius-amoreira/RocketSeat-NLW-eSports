import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { Input } from './Input';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [gameId, setGameId] = useState<string>();
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    })
  }, [])

  async function handleCreatedAt(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    //Validação
    if(!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
    } catch(err) {
      console.log(err);
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
            <Dialog.Overlay className='bg-black/80 inset-0 fixed'/>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
              <Dialog.Title className='text-[32px] font-black'>Publique um anúncio</Dialog.Title>
              <form onSubmit={handleCreatedAt} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  <Select.Root onValueChange={setGameId}>
                    <Select.Trigger className='px-4 py-3 bg-zinc-900 rounded text-sm text-zinc-500 flex justify-between items-center'>
                      <Select.Value placeholder='Selecione o game que deseja jogar'/>
                      <Select.Icon>
                        <CaretDown />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className=''>
                        <Select.ScrollUpButton className='flex justify-center items-center'>
                          <CaretUp />
                        </Select.ScrollUpButton>
                        <Select.Viewport className='rounded leading-relaxed bg-zinc-800 text-sm '>
                          
                            { games.map(game => {
                              return (
                              <div className="group">
                                <Select.Item 
                                  key={game.id}
                                  value={game.id}
                                  className='px-2 py-1 justify-between text-white flex items-center group-hover:bg-violet-500 cursor-pointer'>
                                <Select.ItemText>
                                  {game.title}
                                </Select.ItemText>
                                <Select.ItemIndicator>
                                  <Check className='text-zinc-500 group-hover:text-white'/>
                                </Select.ItemIndicator>
                              </Select.Item>
                            </div>  
                              )
                            }) }                                     
                        </Select.Viewport>
                        <Select.ScrollDownButton className='flex justify-center items-center'>
                          <CaretDown />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root> 
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name='name' id="name" placeholder='Como te chamam dentro do game?'/>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input name='discord' id="discord" placeholder='Usuario#0000'/>
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root 
                    className='grid grid-cols-4 gap-2' 
                    type='multiple'
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item 
                      value="0"
                      title='Domingo'
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        D
                      </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="1"
                      title='Segunda'
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="2"
                      title='Terça'
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        T
                      </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="3"
                      title='Quarta'
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        Q
                      </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="4"
                      title='Quinta'
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        Q
                      </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="5"
                      title='Sexta'
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                      </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="6"
                      title='Sábado'
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      >
                        S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input name='hourStart' id="hourStart" type="time" placeholder='De'/>
                      <Input name='hourEnd' id="hourEnd" type="time" placeholder='Até'/>
                    </div>
                  </div>
                </div>
                <div className='mt-2 flex gap-2 text-sm'>
                  <Checkbox.Root
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        setUseVoiceChannel(true)
                      } else {
                        setUseVoiceChannel(false)
                      }
                    }} 
                    className='w-6 h-6 rounded bg-zinc-900'
                  >
                    <Checkbox.Indicator>
                      <Check className='w-6 h-6 p-1 text-emerald-400'/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span>Costumo me conectar ao chat de voz</span>
                </div>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close 
                  type='button'
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                  >
                    Cancelar
                  </Dialog.Close>
                  <button 
                  type='submit'
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                  >
                    <GameController size={24}/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
  )
}