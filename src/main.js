let input = document.getElementById('itarefa')
        const adicionarBtn = document.getElementById('integrar')
        const todasBtn = document.getElementById('todos')
        const pendentesBtn = document.getElementById('pendentes')
        const concluidasBtn = document.getElementById('concluidos')
        const tarefas = []
        let lista = document.querySelector('section#lista')
        let conc = document.querySelector('span#concluidas')
        let tot = document.querySelector('span#total')

        adicionarBtn.addEventListener('click', () =>{
            if(input.value.trim() === ''){
                return 
            }
            const tarefa = {
                id: Date.now(),
                texto:input.value.trim(),
                concluida: false
            }
            tarefas.push(tarefa)
            input.value = ''
            input.focus()

            atualizarTarefas()
            ConcTot()
        })
        function atualizarTarefas(){
            ConcTot()
            lista.innerHTML = ''
            tarefas.forEach((tarefa) =>{
                const div = document.createElement('div')
                const p = document.createElement('p')
                const button = document.createElement('button')

                p.textContent = tarefa.texto
                button.textContent = '✅'
                button.addEventListener('click', ()=>{
                    tarefa.concluida = !tarefa.concluida
                    atualizarTarefas()
                    ConcTot()
                })
                 if(tarefa.concluida == true){
                        p.style.textDecoration = 'line-through'
                    }
                div.appendChild(p)
                div.appendChild(button)
                lista.appendChild(div)
            })
        }
        todasBtn.addEventListener('click',() =>{
            lista.innerHTML = ''
            atualizarTarefas()
            ConcTot()
        })
        pendentesBtn.addEventListener('click', function naofeitas(){
            lista.innerHTML = ''
            ConcTot()
            const pendentes = tarefas.filter((tarefa) =>{
                if(tarefa.concluida === false)
                return true
            })
            pendentes.forEach((tarefa)=>{
                const div = document.createElement('div')
                const p = document.createElement('p')
                const button = document.createElement('button')
                p.textContent = tarefa.texto
                button.textContent = '✅'
                button.addEventListener('click', ()=>{
                    tarefa.concluida = !tarefa.concluida
                    if(tarefa.concluida === true){
                        p.style.textDecoration = 'line-through'
                    } 
                    naofeitas()
                    ConcTot()
                })
                div.appendChild(p)
                div.appendChild(button)
                lista.appendChild(div)

            })
        })
        concluidasBtn.addEventListener('click', function finalizadas(){
            lista.innerHTML = ''
            ConcTot()
            const prontas = tarefas.filter((tarefa) =>{
                if(tarefa.concluida) return true
            })
            prontas.forEach((tarefa)=>{
                const div = document.createElement('div')
                const p = document.createElement('p')
                const button = document.createElement('button')
                p.textContent = tarefa.texto
                if(tarefa.concluida){
                        p.style.textDecoration = 'line-through'
                    } 
                button.textContent = '✅'
                button.addEventListener('click', ()=>{
                    tarefa.concluida = !tarefa.concluida
                    if(tarefa.concluida){
                        p.style.textDecoration = 'line-through'
                    } 
                    finalizadas()
                    ConcTot()
                })
                div.appendChild(p)
                div.appendChild(button)
                lista.appendChild(div)
            })
        })
        function ConcTot(){
    const totalConcluidas = tarefas.reduce((acumulador, tarefa) => {
        if(tarefa.concluida){
            return acumulador + 1
        }
        return acumulador
    }, 0)

    conc.innerHTML = totalConcluidas
    tot.innerHTML = tarefas.length
}
