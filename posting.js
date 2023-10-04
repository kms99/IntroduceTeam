function openclose() {
    $('#postingbox').toggle();
}

function makeCard() {
    let images = $('#images').val();
    let name = $('#name').val();
    let living = $('#living').val();
    let MBTI = $('#MBTI').val();
    let blog = $('#blog').val();
    let git = $('#git').val();
    let goal = $('#goal').val();
    let firstSalary = $('#firstSalary').val();
    let Advantages = $('#Advantages').val();
    let collabo = $('#collabo').val();

    let temp_html = `            
    <div class="col">
        <div class="card h-100">
            <img src="${images}"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-name">${name}</h5>
                <p class="card-living">${living}</p>
                <p class="card-MBTI">${MBTI}</p>
                <p class="card-goal">${goal}</p>
                <p class="card-firstSalary">${firstSalary}</p>
                <p class="card-Advantages">${Advantages}</p>
                <p class="card-collabo">${collabo}</p>
            </div>
            <div class="card-footer">
                <small class="text-body-blog">${blog}</small>
                <small class="text-body-git">${git}</small>
            </div>
        </div>
    </div>`;
    $('#card').append(temp_html);
}


document.getElementById('posting-btn').addEventListener('click',makeCard)
document.getElementById('posting-box-open-btn').addEventListener('click',openclose)