import { Link } from "react-router-dom";

function NewList(props) {
    return (
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Create New List</h4>
                    </div>
                    <div class="modal-body">
                        <input placeholder="list name" />
                        <textarea placeholder="description" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewList;